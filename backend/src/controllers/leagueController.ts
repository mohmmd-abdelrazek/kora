import { Request, Response } from "express";
import pool from "../config/pgConfig";

export const createLeague = async (req: Request, res: Response) => {
  const {
    leagueName,
    numberOfTeams,
    playersPerTeam,
    dateString,
    startTime,
    matchDuration,
    breakDuration,
    totalPlayTime,
    numberOfPlaygrounds,
    teamNames,
  } = req.body;
  const userId = req.user?.id;

  try {
    await pool.query("BEGIN");
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid date provided." });
    }

    const [hours, minutes] = startTime.split(":").map(Number);
    date.setHours(hours, minutes);
    const dateTimeISO = date.toISOString();

    const leagueInsertQuery =
      "INSERT INTO leagues(name, number_of_teams, players_per_team, start_timestamp, match_duration, break_duration, total_time, number_of_grounds, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
    const leagueValues = [
      leagueName,
      numberOfTeams,
      playersPerTeam,
      dateTimeISO,
      matchDuration,
      breakDuration,
      totalPlayTime,
      numberOfPlaygrounds,
      userId,
    ];
    const leagueResult = await pool.query(leagueInsertQuery, leagueValues);
    const league = leagueResult.rows[0];
    const leagueId = league.id;

    const leagueSlug = `${leagueName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\u0621-\u064A-]+/g, "")}-${leagueId}`;
    const updateQuery = "UPDATE leagues SET slug = $1 WHERE id = $2";
    await pool.query(updateQuery, [leagueSlug, leagueId]);

    const teamInsertQuery = "INSERT INTO teams(name, league_id) VALUES($1, $2)";
    for (const teamName of teamNames) {
      await pool.query(teamInsertQuery, [teamName, leagueId]);
    }

    await pool.query("COMMIT");

    res.status(201).json({
      message: "League and teams created successfully",
      league: league,
      leagueSlug: leagueSlug,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Failed to create league and teams:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLeague = async (req: Request, res: Response) => {
  const { leagueId } = req.params;

  try {
    const { rows } = await pool.query("SELECT * FROM leagues WHERE id = $1", [
      leagueId,
    ]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({
        message: "League not found or you do not have permission to view it.",
      });
    }
  } catch (error) {
    console.error("Error fetching league:", error);
    res.status(500).json({ message: "Server error while fetching league." });
  }
};

export const getLeagues = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM leagues WHERE user_id = $1",
      [userId]
    );
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({
        message: "No leagues found. You have not created any leagues yet.",
      });
    }
  } catch (error) {
    console.error("Error fetching leagues:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const generateSchedule = async (req: Request, res: Response) => {
  const { leagueId } = req.params;

  try {
    const leagueQuery = "SELECT * FROM leagues WHERE id = $1";
    const leagueRes = await pool.query(leagueQuery, [leagueId]);
    const league = leagueRes.rows[0];

    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }

    const {
      total_time: totalTime,
      number_of_grounds: numberOfPlaygrounds,
      match_duration: matchDuration,
      break_duration: breakDuration,
      start_timestamp: startTime,
    } = league;

    const totalPlayTimeMs = totalTime * 60000;
    const matchTotalDurationMs = (matchDuration + breakDuration) * 60000;

    let currentTime = new Date(startTime);
    const endTime = new Date(currentTime.getTime() + totalPlayTimeMs);

    const teamsQuery = "SELECT * FROM teams WHERE league_id = $1 ORDER BY team_id";
    const teamsRes = await pool.query(teamsQuery, [leagueId]);
    let teams = teamsRes.rows;

    if (teams.length % 2 !== 0) {
      teams.push({ team_id: "bye", name: "Bye" }); // Dummy team for bye matches
    }

    const schedule = [];
    let round = 1;

    // Track the next available time for each playground
    const playgroundAvailability = new Array(numberOfPlaygrounds).fill(new Date(startTime));

    for (let currentRound = 0; ; currentRound++) {
      let matchesScheduledInRound = 0;

      for (let match = 0; match < teams.length / 2; match++) {
        const homeTeam = teams[match];
        const awayTeam = teams[teams.length - 1 - match];

        if (homeTeam.team_id === "bye" || awayTeam.team_id === "bye") continue;

        // Find the next available playground
        let nextAvailablePlaygroundIndex = playgroundAvailability.findIndex(
          time => time <= currentTime
        );
        if (nextAvailablePlaygroundIndex === -1) {
          // If no playground is available yet, find the earliest available
          nextAvailablePlaygroundIndex = playgroundAvailability
            .map(time => time.getTime())
            .indexOf(Math.min(...playgroundAvailability.map(time => time.getTime())));
          currentTime = new Date(Math.min(...playgroundAvailability.map(time => time.getTime())));
        }

        if (currentTime.getTime() + matchTotalDurationMs > endTime.getTime()) break;

        const playgroundName = `P${nextAvailablePlaygroundIndex + 1}`;

        schedule.push({
          round,
          homeTeam: homeTeam.name,
          awayTeam: awayTeam.name,
          playground: playgroundName,
          startTime: new Date(currentTime).toLocaleString(),
          endTime: new Date(currentTime.getTime() + matchDuration * 60000).toLocaleString(),
        });

        // Update the next available time for this playground
        playgroundAvailability[nextAvailablePlaygroundIndex] = new Date(currentTime.getTime() + matchTotalDurationMs);
        matchesScheduledInRound++;
      }

      if (matchesScheduledInRound === 0 || currentTime.getTime() + matchTotalDurationMs > endTime.getTime()) {
        break;
      }

      teams = [teams[0], ...teams.slice(-1), ...teams.slice(1, -1)];
      round++;
    }

    res.json(schedule);
  } catch (error) {
    console.error("Error generating schedule:", error);
    res.status(500).json({ message: "Failed to generate schedule" });
  }
};


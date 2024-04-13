import express from "express";
import * as leagueController from "../controllers/leagueController";
import { isAuthenticated } from "../middleware/middleware";

const router = express.Router();

router.post("/league", isAuthenticated, leagueController.createLeague);
router.get("/leagues",isAuthenticated, leagueController.getLeagues);
router.get("/league/:leagueId", leagueController.getLeague);
router.get("/league/:leagueId/schedule", leagueController.generateSchedule);

export default router;

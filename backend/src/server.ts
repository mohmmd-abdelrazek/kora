import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors"; 
// import rateLimit from "express-rate-limit";


import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import leagueRoutes from "./routes/leagueRoutes";
import teamRoutes from "./routes/teamRoutes";
import playerRoutes from "./routes/playerRoutes";

import "./config/pgConfig";
import passport from "./config/passportConfig";
import { sessionMiddleware } from "./config/sessionConfig";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// });

// app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", leagueRoutes); 
app.use("/api", teamRoutes); 
app.use("/api/player", playerRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

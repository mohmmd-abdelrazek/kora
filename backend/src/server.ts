import * as dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors"; // Import CORS

// Import your modular route definitions
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import leagueRoutes from "./routes/leagueRoutes";
import teamRoutes from "./routes/teamRoutes";
import playerRoutes from "./routes/playerRoutes";

// Assuming it sets up a connection and does not export anything directly used here
import "./config/pgConfig";
import passport from "./config/passportConfig";
import { sessionMiddleware } from "./config/redisConfig";

// Initialize environment variables

const app = express();

// // CORS configuration for localhost:3000
// const corsOptions = {
//   origin: "http://localhost:3000", // Allow only http://localhost:3000
//   credentials: true, // Allow cookies to be sent with requests
// };

app.use(cors()); // Use CORS with the specified options

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});

// Body parsing middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(sessionMiddleware);

app.use((req, res, next) => {
  console.log("Session:", req.session);
  next();
});

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("User:", req.user);
  next();
});

// Modular route setup
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", leagueRoutes); // Added '/league' to make the route specific
app.use("/api", teamRoutes); // Added '/team' to make the route specific
app.use("/api/player", playerRoutes);

// Catch-all for unhandled routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handling middleware
// Corrected the signature to include 'next' and marked as ErrorRequestHandler for clarity
app.use((err: Error, req: Request, res: Response) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

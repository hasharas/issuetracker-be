import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();


const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: { success: false, message: "Too many requests, please try again later." },
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", limiter);

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

app.get("/api/health", (req, res) => res.json({ status: "OK", timestamp: new Date() }));

app.use(errorHandler);

export default app;
import express from "express";
import { body } from "express-validator";
import {
      getIssues, getIssue, createIssue,
      updateIssue, deleteIssue, exportIssues,
} from "../controllers/issueController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

const issueValidation = [
      body("title").trim().isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
      body("description").trim().notEmpty().withMessage("Description is required"),
      body("priority").optional().isIn(["Low", "Medium", "High", "Critical"]),
      body("severity").optional().isIn(["Minor", "Major", "Critical", "Blocker"]),
      body("status").optional().isIn(["Open", "In Progress", "Resolved", "Closed"]),
];

router.route("/").get(getIssues).post(issueValidation, createIssue);
router.get("/export", exportIssues);
router.route("/:id").get(getIssue).put(updateIssue).delete(deleteIssue);

export default router;
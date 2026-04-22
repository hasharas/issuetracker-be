import { validationResult } from "express-validator";
import Issue from "../models/Issue.js";

export const getIssues = async (req, res, next) => {
      try {
            const {
                  page = 1, limit = 10, status, priority, severity,
                  search, sortBy = "createdAt", order = "desc",
            } = req.query;

            const filter = { createdBy: req.user._id };
            if (status) filter.status = status;
            if (priority) filter.priority = priority;
            if (severity) filter.severity = severity;
            if (search) filter.$text = { $search: search };

            const total = await Issue.countDocuments(filter);
            const issues = await Issue.find(filter)
                  .sort({ [sortBy]: order === "desc" ? -1 : 1 })
                  .skip((page - 1) * limit)
                  .limit(Number(limit))
                  .populate("createdBy", "name email");

            // Status counts
            const statusCounts = await Issue.aggregate([
                  { $match: { createdBy: req.user._id } },
                  { $group: { _id: "$status", count: { $sum: 1 } } },
            ]);

            const counts = { Open: 0, "In Progress": 0, Resolved: 0, Closed: 0 };
            statusCounts.forEach(({ _id, count }) => { counts[_id] = count; });

            res.json({
                  success: true,
                  data: issues,
                  pagination: {
                        total,
                        page: Number(page),
                        pages: Math.ceil(total / limit),
                        limit: Number(limit),
                  },
                  counts,
            });
      } catch (error) {
            next(error);
      }
};

export const getIssue = async (req, res, next) => {
      try {
            const issue = await Issue.findOne({
                  _id: req.params.id,
                  createdBy: req.user._id,
            }).populate("createdBy", "name email");

            if (!issue) return res.status(404).json({ success: false, message: "Issue not found" });
            res.json({ success: true, data: issue });
      } catch (error) {
            next(error);
      }
};

export const createIssue = async (req, res, next) => {
      try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                  return res.status(400).json({ success: false, message: errors.array()[0].msg });

            const issue = await Issue.create({ ...req.body, createdBy: req.user._id });
            res.status(201).json({ success: true, data: issue });
      } catch (error) {
            next(error);
      }
};

export const updateIssue = async (req, res, next) => {
      try {
            const issue = await Issue.findOneAndUpdate(
                  { _id: req.params.id, createdBy: req.user._id },
                  req.body,
                  { new: true, runValidators: true }
            );
            if (!issue) return res.status(404).json({ success: false, message: "Issue not found" });
            res.json({ success: true, data: issue });
      } catch (error) {
            next(error);
      }
};

export const deleteIssue = async (req, res, next) => {
      try {
            const issue = await Issue.findOneAndDelete({
                  _id: req.params.id,
                  createdBy: req.user._id,
            });
            if (!issue) return res.status(404).json({ success: false, message: "Issue not found" });
            res.json({ success: true, message: "Issue deleted successfully" });
      } catch (error) {
            next(error);
      }
};

export const exportIssues = async (req, res, next) => {
      try {
            const issues = await Issue.find({ createdBy: req.user._id })
                  .populate("createdBy", "name email")
                  .lean();
            res.json({ success: true, data: issues });
      } catch (error) {
            next(error);
      }
};
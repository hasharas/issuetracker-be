import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
      {
            title: {
                  type: String,
                  required: [true, "Title is required"],
                  trim: true,
                  minlength: 3,
                  maxlength: 200,
            },
            description: {
                  type: String,
                  required: [true, "Description is required"],
                  trim: true,
                  maxlength: 5000,
            },
            status: {
                  type: String,
                  enum: ["Open", "In Progress", "Resolved", "Closed"],
                  default: "Open",
            },
            priority: {
                  type: String,
                  enum: ["Low", "Medium", "High", "Critical"],
                  default: "Medium",
            },
            severity: {
                  type: String,
                  enum: ["Minor", "Major", "Critical", "Blocker"],
                  default: "Minor",
            },
            tags: [{ type: String, trim: true }],
            assignedTo: {
                  type: String,
                  trim: true,
                  default: "",
            },
            createdBy: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
                  required: true,
            },
      },
      { timestamps: true }
);

// Text index for search
issueSchema.index({ title: "text", description: "text" });

export default mongoose.model("Issue", issueSchema);
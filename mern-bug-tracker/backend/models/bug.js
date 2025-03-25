const mongoose = require("mongoose");

const BugSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Bug title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Bug description is required"],
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    createdBy: {
      type: String,
      required: [true, "Creator name is required"],
    },
    assignedTo: {
      type: String,
      default: "Unassigned",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bug", BugSchema);

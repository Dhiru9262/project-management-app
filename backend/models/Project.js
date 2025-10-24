import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    teamMembers: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: String, default: "Member" },
      },
    ],

    course: {
      name: { type: String, required: true },
      code: { type: String },
    },

    instructor: {
      name: { type: String, required: true },
      email: { type: String },
    },

    problemStatement: {
      type: String,
      required: true,
    },

    objective: {
      type: String,
      required: true,
    },

    approach: {
      type: String,
      required: true,
    },

    toolsUsed: {
      type: [String], // e.g. ["React", "Node.js"]
      default: [],
    },

    timeline: {
      type: String, // e.g. "Planning: Oct 1–5 | Development: Oct 6–Nov 1"
      required: true,
    },

    expectedOutcome: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Draft", "In Progress", "Submitted", "Completed"],
      default: "Draft",
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const Project = mongoose.model("Project", projectSchema);

export default Project;

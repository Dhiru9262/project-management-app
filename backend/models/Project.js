const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String, // student email who created
      required: true,
    },
    team: [teamMemberSchema], // list of students
    mentorApproval: {
      type: String,
      enum: ["Approved", "Rejected", null],
      default: null,
    },
    status: {
      type: String,
      enum: ["Draft", "Pending Mentor Approval", "Approved", "Rejected"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);

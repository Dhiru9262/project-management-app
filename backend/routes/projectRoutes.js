const express = require("express");
const {
  createProject,
  respondToProject,
  mentorApproval,
  getMyProjects,
  getPendingProjectsForMentor,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", createProject); // student creates
router.post("/:id/response", respondToProject); // team member accept/reject
router.post("/:id/mentor-approval", mentorApproval); // mentor final approval
router.get("/my-projects", getMyProjects); // get projects for student/team member
router.get("/mentor/pending", getPendingProjectsForMentor); // get all pending mentor approvals

module.exports = router;

const express = require("express");
const {
  createProject,
  respondToProject,
  mentorApproval,
  myProjects,
  getProjectsByInstructor,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", createProject); // student creates
router.get("/my-projects", myProjects); // student creates
router.get("/teacher-projects", getProjectsByInstructor);

module.exports = router;

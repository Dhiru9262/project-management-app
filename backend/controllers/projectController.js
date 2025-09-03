const Project = require("../models/Project");

// 1. Student creates project
const createProject = async (req, res) => {
  try {
    const { title, synopsis, createdBy, team } = req.body;

    const newProject = new Project({
      title,
      synopsis,
      createdBy,
      team: team.map((email) => ({ email, status: "Pending" })), // initialize team
      status: "Draft", // initial state
    });

    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
};

// 2. Team member responds (Accept / Reject)
const respondToProject = async (req, res) => {
  try {
    const { id } = req.params; // project ID
    const { email, response } = req.body; // "Accepted" / "Rejected"

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const member = project.team.find((m) => m.email === email);
    if (!member) return res.status(400).json({ message: "Not a team member" });

    // Update member response
    member.status = response;

    // Update project status depending on responses
    if (project.team.some((m) => m.status === "Rejected")) {
      project.status = "Rejected";
    } else if (project.team.every((m) => m.status === "Accepted")) {
      project.status = "Pending Mentor Approval";
    } else {
      project.status = "Draft"; // still waiting
    }

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error responding to project", error });
  }
};

// 3. Mentor approves or rejects project
const mentorApproval = async (req, res) => {
  try {
    const { id } = req.params; // project ID
    const { decision } = req.body; // "Approved" / "Rejected"

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.status !== "Pending Mentor Approval") {
      return res
        .status(400)
        .json({ message: "Project not ready for mentor approval" });
    }

    project.mentorApproval = decision;
    project.status = decision === "Approved" ? "Approved" : "Rejected";

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error in mentor approval", error });
  }
};

// 4. Get projects for a specific user (student / team member)
const getMyProjects = async (req, res) => {
  try {
    const { email } = req.query; // email passed as query param

    const projects = await Project.find({
      $or: [
        { createdBy: email }, // student created
        { "team.email": email }, // or is team member
      ],
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

// 5. Get projects waiting for mentor approval
const getPendingProjectsForMentor = async (req, res) => {
  try {
    const projects = await Project.find({ status: "Pending Mentor Approval" });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mentor projects", error });
  }
};

module.exports = {
  createProject,
  respondToProject,
  mentorApproval,
  getMyProjects,
  getPendingProjectsForMentor,
};

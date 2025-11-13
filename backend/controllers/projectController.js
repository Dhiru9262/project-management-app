import Project from "../models/Project.js";

/**
 * @desc   Create a new project
 * @route  POST /api/projects
 * @access Public (you can make it private later using auth)
 */
export const createProject = async (req, res) => {
  try {
    const {
      title,
      teamMembers,
      course,
      instructor,
      problemStatement,
      objective,
      approach,
      toolsUsed,
      timeline,
      expectedOutcome,
      status,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !problemStatement ||
      !objective ||
      !approach ||
      !timeline ||
      !expectedOutcome
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const project = new Project({
      title,
      teamMembers,
      course,
      instructor,
      problemStatement,
      objective,
      approach,
      toolsUsed,
      timeline,
      expectedOutcome,
      status,
    });

    const createdProject = await project.save();
    res.status(201).json({
      message: "Project created successfully",
      project: createdProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// my project
export const myProjects = async (req, res) => {
  try {
    const email = req.query.email; // team member email
    if (!email) return res.status(400).json({ message: "Email is required" });

    const projects = await Project.find({
      "teamMembers.email": email, // Mongo query to check in teamMembers array
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// get project by instructor
export const getProjectsByInstructor = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email)
      return res.status(400).json({ message: "Instructor email is required" });

    const projects = await Project.find({
      "instructor.email": email,
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching teacher projects:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// DELETE project by ID (query param)
export const deleteProject = async (req, res) => {
  try {
    const { _id } = req.query;

    // 1. Validate ID
    if (!_id) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    // 2. Find the project
    const project = await Project.findById(_id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 3. Delete project
    await Project.findByIdAndDelete(_id);

    // 4. Send response
    res.status(200).json({
      message: "Project deleted successfully",
      deletedId: _id,
    });
  } catch (error) {
    console.error("Error deleting project:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const express = require("express");
const {
  getProject,
  getProjects,
  addProject,
  updateProject,
  deleteProject
} = require("../helpers/projectsDb");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const project = await getProject(id);
    if (!project) {
      res.status(404).json({ error: "A project with that id does not exist" });
    } else {
      res.status(200).json(project);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await getProjects();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const project = req.body;
  try {
    const numberAdded = await addProject(project);
    if (numberAdded === 0) {
      res.status(404).json({ error: "Please include name, description and completed values" });
    } else {
      res.status(201).json(numberAdded);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const numberUpdated = await updateProject(id, update);
    if (numberUpdated !== 0) {
      res.status(200).json(numberUpdated);
    } else {
      res.status(400).json({ error: "A project with that id does not exist" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const numberDeleted = await deleteProject(id);
    if (numberDeleted !== 0) {
      res.status(200).json(numberDeleted);
    } else {
      res.status(400).json({ error: "A project with that id does not exist" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

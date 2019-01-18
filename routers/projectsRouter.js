const express = require("express");
const { getProject, addProject } = require("../helpers/projectsDb");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await getProject(id);
    if (project.length !== 0) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: "A project with that id does not exist" });
    }
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

module.exports = router;

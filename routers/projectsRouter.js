const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await getProject(id);
    console.log(project);
    if (project.length !== 0) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: "A project with that id does not exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const action = req.body;
  try {
    const numberAdded = await db("projects").insert(action);
    if (numberAdded === 0) {
      res.status(404).json({ error: "Please include name, description and completed values" });
    } else {
      res.status(201).json(numberAdded);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

const getProject = id => {
  const project = db("projects")
    .where({ id })
    .first();
  const actions = db("actions").where({ project_id: id });

  return Promise.all([project, actions]).then(results => {
    let [project, actions] = results;
    project.completed === 0 ? (project.completed = false) : (project.completed = true);
    actions.map(action =>
      action.completed === 0 ? (action.completed = false) : (action.completed = true)
    );

    let result = { ...project, actions: actions };
    return result;
  });
};

module.exports = router;

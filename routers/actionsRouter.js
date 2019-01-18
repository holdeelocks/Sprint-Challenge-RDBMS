const express = require("express");
const {
  addAction,
  getActions,
  getAction,
  updateAction,
  deleteAction
} = require("../helpers/actionsDb");

const router = express.Router();

router.post("/", async (req, res) => {
  const action = req.body;
  try {
    const numberAdded = await addAction(action);
    if (numberAdded === 0) {
      res.status(400).json({ error: "Please include description and notes values." });
    } else {
      res.status(201).json(numberAdded);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const action = await getAction(id);
    if (!action) {
      res.status(404).json({ error: "An action with that id does not exist" });
    } else {
      res.status(200).json(action);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const actions = await getActions();
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const numberRemoved = await deleteAction(id);
    if (numberRemoved !== 0) {
      res.status(202).json(numberRemoved);
    } else {
      res.status(400).json({ error: "An action with that id does not exist" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const action = req.body;

  try {
    const numberUpdated = await updateAction(id, action);
    if (numberUpdated !== 0) {
      res.status(200).json(numberUpdated);
    } else {
      res.status(400).json({ error: "An action with that ID does not exist" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

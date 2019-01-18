const express = require("express");
const { addAction } = require("../helpers/actionDb");

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

module.exports = router;

// const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

const addAction = action => {
  return db("actions").insert(action);
};

const getActions = () => {
  const actions = db("actions");

  return Promise.all([actions]).then(results => {
    let [actions] = results;
    actions.map(action =>
      action.completed === 0 ? (action.completed = false) : (action.completed = true)
    );
    return actions;
  });
};

const getAction = id => {
  const action = db("actions")
    .where({ id })
    .first();
  const context = db("action_context as ac")
    .join("context as c", "ac.context_id", "c.id")
    .where({ "ac.action_id": id })
    .select("c.id as id", "c.name as Context");

  return Promise.all([action, context]).then(results => {
    let [action, context] = results;
    if (results[0] === undefined) {
      return null;
    }
    action.completed === 0 ? (action.completed = false) : (action.completed = true);
    let result = { ...action, context: context };
    return result;
  });
};

const deleteAction = id => {
  return db("actions")
    .where({ id })
    .del();
};

const updateAction = (id, update) => {
  return db("actions")
    .where({ id })
    .update(update);
};

module.exports = {
  addAction,
  getActions,
  getAction,
  deleteAction,
  updateAction
};

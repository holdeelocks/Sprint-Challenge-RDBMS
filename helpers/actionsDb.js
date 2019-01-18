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
  const action = db("actions").where({ id });

  return Promise.all([action]).then(results => {
    let [action] = results[0];
    if (results[0].length === 0) {
      return null;
    }
    action.completed === 0 ? (action.completed = false) : (action.completed = true);
    let result = { ...action };
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

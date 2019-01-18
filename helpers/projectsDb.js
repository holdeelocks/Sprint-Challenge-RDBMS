// const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

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

const addProject = project => {
  return db("projects").insert(project);
};

module.exports = {
  getProject,
  addProject
};

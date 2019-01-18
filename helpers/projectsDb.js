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
    if (results[0] === undefined) {
      return null;
    }
    project.completed === 0 ? (project.completed = false) : (project.completed = true);
    actions.map(action =>
      action.completed === 0 ? (action.completed = false) : (action.completed = true)
    );
    let result = { ...project, actions: actions };
    return result;
  });
};

const getProjects = () => {
  const projects = db("projects");

  return Promise.all([projects]).then(results => {
    let [projects] = results;
    projects.map(project =>
      project.completed === 0 ? (project.completed = false) : (project.completed = true)
    );
    return projects;
  });
};

const addProject = project => {
  return db("projects").insert(project);
};

const updateProject = (id, update) => {
  return db("projects")
    .where({ id })
    .update(update);
};

const deleteProject = id => {
  return db("projects")
    .where({ id })
    .del();
};

module.exports = {
  getProject,
  getProjects,
  addProject,
  updateProject,
  deleteProject
};

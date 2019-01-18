// const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

const addAction = action => {
  return db("actions").insert(action);
};

module.exports = {
  addAction
};

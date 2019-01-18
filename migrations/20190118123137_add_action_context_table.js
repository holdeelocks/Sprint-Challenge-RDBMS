exports.up = function(knex, Promise) {
  return knex.schema.createTable("action_context", function(tbl) {
    tbl
      .integer("action_id")
      .unsigned()
      .references("id")
      .inTable("actions");
    tbl
      .integer("context_id")
      .unsigned()
      .references("id")
      .inTable("context");
    tbl.primary(["action_id", "context_id"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("action_context");
};

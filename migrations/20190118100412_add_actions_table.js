exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", function(tbl) {
    tbl.increments();
    tbl.string("description").notNullable();
    tbl.string("notes").notNullable();
    tbl
      .boolean("project_completed")
      .references("completed")
      .inTable("projects");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions");
};

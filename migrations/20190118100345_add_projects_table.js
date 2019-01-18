exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", function(tbl) {
    tbl.increments().onDelete(CASCADE);
    tbl
      .string("name", 128)
      .unique("uq_project_name")
      .notNullable();
    tbl.string("description", 256).notNullable();
    tbl
      .boolean("completed")
      .notNullable()
      .defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects");
};

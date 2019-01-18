exports.up = function(knex, Promise) {
  return knex.schema.createTable("context", function(tbl) {
    tbl.increments();
    tbl.string("name", 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("context");
};

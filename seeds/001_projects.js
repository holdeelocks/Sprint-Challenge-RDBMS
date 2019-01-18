exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          name: "Do Sprint",
          description: "Try not to screw up this sprint",
          completed: false
        },
        {
          name: "Learn GraphQL",
          description: "It's much nicer than knex",
          completed: false
        },
        {
          name: "Get in Shape",
          description: "Stop spending so much time stuck on the couch",
          completed: false
        }
      ]);
    });
};

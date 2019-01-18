exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("actions")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("actions").insert([
        {
          description: "Finish MVP",
          notes: "Get that minimum viable product yeeeuhhhhh",
          completed: true,
          project_id: 1
        },
        {
          description: "Complete Stretch",
          notes: "Impossible but worth a shot",
          completed: false,
          project_id: 1
        },
        {
          description: "Do the backend Node.js tutorial",
          notes: "GraphQL is so nice we should learn this cool new thing",
          completed: true,
          project_id: 2
        },
        {
          description: "Do frontend React Tutorial",
          notes: "Hopefully get that done this afternoon",
          completed: false,
          project_id: 2
        },
        {
          description: "Eat healthier",
          notes: "no more junk food",
          completed: true,
          project_id: 3
        },
        {
          description: "work out",
          notes: "do the opposite of sitting on computer all day",
          completed: false,
          project_id: 3
        }
      ]);
    });
};

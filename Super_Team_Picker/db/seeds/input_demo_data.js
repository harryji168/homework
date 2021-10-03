
const { fake } = require("faker");
const faker = require("faker")
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      const cohorts=[];
        
      for (let i = 0; i < 30; i++) {
        members_string=faker.name.firstName();
        for(let j = 0; j < Math.floor((Math.random() * 60) + 10); j++) {
             members_string = members_string+","+ faker.name.firstName();
         } 
        cohorts.push(
          { 
            name: faker.company.companyName(), 
            members: members_string, 
            logoUrl: faker.image.imageUrl(),
          },
        )
      };
      return knex('cohorts').insert(cohorts);
    });
};

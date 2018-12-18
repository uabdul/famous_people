const settings = require("./settings");


var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const firstName = process.argv[2];
const lastName = process.argv[3];
const dateOfBirth = process.argv[4];

knex('famous_people')
  .insert({
    'first_name': firstName,
    'last_name': lastName,
    'birthdate': dateOfBirth
  })
  .then(() => {
    knex.select().from('famous_people')
    .then((results) => {
      parseResults(results);
    })
  })
  .finally(() => {
    knex.destroy();
  })


function parseResults(arr) {
  arr.forEach((element, index) => {
    let birthdate = element.birthdate.toDateString();
    console.log(`- ${index + 1}: ${element.first_name} ${element.last_name}, born ${birthdate}`);
  })
}
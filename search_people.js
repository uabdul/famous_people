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

const value = process.argv[2]

knex.select().from('famous_people').where('first_name', value)
  .then((results) => {
    parseResults(results);
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
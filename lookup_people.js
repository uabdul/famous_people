const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const value = process.argv.slice(2)

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1", value, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching...");
    console.log("Found ", result.rows.length, " person(s) by the name '", value[0], "'")
    parseResults(result.rows);
    client.end();
  });
});

function parseResults(arr) {
  arr.forEach((element, index) => {
    let birthdate = element.birthdate.toDateString();
    console.log(`- ${index + 1}: ${element.first_name} ${element.last_name}, born ${birthdate}`);
  })
}
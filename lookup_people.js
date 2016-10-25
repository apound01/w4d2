const pg = require("pg");
const settings = require("./settings"); // settings.json

const db = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var name = process.argv[2];

db.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  let query =
    `SELECT
    first_name,
    last_name,
    birthdate
    FROM famous_people
    WHERE first_name = $1::text OR last_name = $1::text`;

  db.query(query, [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0]); //output: 1
    db.end();
  });
});

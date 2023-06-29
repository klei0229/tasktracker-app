const fs = require("fs");

const Pool = require("pg").Pool;
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

let pool;
if(isProduction){
    pool = new Pool({
        connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
        ssl: {
          rejectUnauthorized: false,
        },
      });
}
else{
    pool = new Pool({
          user: "postgres",
          password: "",
          host: "localhost",
          port: 5432,
          database: "todo_db",
        });
    }


const seedQuery = fs.readFileSync("database.sql", { encoding: "utf8" });

pool.query(seedQuery, (err, res) => {
  console.log("Seeding Completed!");
  // pool.end();
});

module.exports = pool;

const fs = require("fs");
const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL //heroku addon
}
console.log(process.env.NODE_ENV)
const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig)

const seedQuery = fs.readFileSync("database.sql", { encoding: "utf8" });

pool.query(seedQuery, (err, res) => {
  console.log("Seeding Completed!");
  console.log(err,res)
  // console.log(pool)
  // pool.end();
});

module.exports = pool;

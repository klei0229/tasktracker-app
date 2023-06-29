const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 3001;

//middleware
app.use(cors());
app.use(express.json());

//USER routes

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//create a new user
app.post("/users", async (req, res) => {
  try {
    console.log("POST");
    const { name } = req.body;
    console.log(name);
    const newUser = await pool.query(
      "INSERT INTO task_users (name) VALUES($1) RETURNING * ",
      [name]
    );
    res.json(newUser);
    console.log(newUser);
  } catch (error) {
    console.log(error.message);
    res.json("error");
  }
});

app.get("/users/:name", async (req, res) => {
  try {
    const { name } = req.params;
    console.log(name);
    const user = await pool.query("SELECT * FROM task_users WHERE name=$1", [
      name,
    ]);
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.json("error");
  }
});

// //create
// app.post("/todos", async (req, res) => {
//   try {
//     console.log(req.body);
//     const { description } = req.body;
//     const newEntry = await pool.query(
//       "INSERT INTO todo (description) VALUES($1) RETURNING * ",
//       [description]
//     );
//     res.json(newEntry);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// //get all todos
// app.get("/todos", async (req, res) => {
//   try {
//     const allTodos = await pool.query("SELECT * from todo");
//     res.json(allTodos.rows);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

//get a todo
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const entries = await pool.query(
      "SELECT * FROM task_entries WHERE user_id=$1",
      [id]
    );
    res.json(entries.rows);
  } catch (error) {
    console.log(error.message);
  }
});
//create a todo
app.post("/tasks/:id", async (req, res) => {
  console.log("post request");
  try {
    console.log(req.params);
    const { id } = req.params;

    console.log(req.body);
    const { title, description, status, date } = req.body;
    const newEntry = await pool.query(
      "INSERT INTO task_entries (title, description, status, date,user_id ) VALUES($1,$2,$3,$4,$5) RETURNING * ",
      [title, description, status, date, id]
    );
    res.json(newEntry);
    // const { description } = req.body;

    // res.json("ToDo was updated");
    console.log("added task to table");
  } catch (error) {
    console.log(error.message);
  }
});

//update
app.put("/tasks/:id", async (req, res) => {
  console.log("put request");
  try {
    console.log(req.params);
    const { id } = req.params;
    console.log(id);
    console.log("body", req.body);
    const { title, description, status, date } = req.body;
    const updatedEntry = await pool.query(
      "UPDATE task_entries SET description = $3, title = $2, status = $4, date = $5 WHERE entry_id = $1 RETURNING *",
      [id, title, description, status, date]
    );
    res.json(updatedEntry);
    console.log("edited task");
  } catch (error) {
    console.log(error.message);
  }
});

//delete a todo
app.delete("/tasks/:id", async (req, res) => {
  try {
    console.log("delete");
    console.log(req.params);
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM task_entries WHERE entry_id = $1",
      [id]
    );
    res.json("Todo was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

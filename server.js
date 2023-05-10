const express = require("express");
const app = express();

const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "api_data",
});

// GET-route för att hämta alla filmer
app.get("/movies", (req, res) => {
  var sql = "SELECT * FROM movies";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});

// GET-route för att hämta en specifik film med ID
app.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  var sql = `SELECT * FROM movies WHERE id = "${id}" `;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});

const crypto = require("crypto");

function hash(data) {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}
//POST /users

const crypto = require("crypto"); //använder NodeJS inbyggda krypteringsfunktioner.

function hash(data) {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

app.post("/users", (req, res, next) => {
  if (req.body.username && req.body.username && req.body.name) {
    let sql = `SELECT * from movies  WHERE username = "${req.body.username}"`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length === 0) {
        let passwordHash = hash(req.body.password);
        let sql = `INSERT INTO users (name, password, username) VALUES ("${req.body.name}", "${passwordHash}", "${req.body.username}")`; // Skapar en användare med datan som skickas in

        connection.query(sql, function (err, result, fields) {
          const createdUser = result.insertId;
          if (err) throw err;
          res.status(201).json({
            updatedId: createdUser,
          });
        });
      } else {
        res.status(400).json({
          message: "Username already taken.",
        });
      }
    });
  }
});

app.post("/login", function (req, res) {
  //kod här för att hantera anrop…
  let sql = `SELECT * FROM users WHERE username='${req.body.username}'`;
  const html = `
  
    <html>
    <body>
      <h1>API routes:</h1>
      <ul>
        ${routes.map((r) => `<li>${r.path}: ${r.description}</li>`).join("")}
      </ul>
    </body>
  </html>
  
`;
  res.send(html);

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    //kod här för att hantera returnera data…
  });
});
// Route för att hämta dokumentationen
app.get("/", (req, res) => {
  const documentation = `
    <h1>API Dokumentation</h1>
    <h2>GET /movies</h2>
    <p>Beskrivning: Returnerar en lista över alla filmer i databasen.</p>
    <p>HTTP-metod: GET</p>
    
    <h2>GET /movies/:id</h2>
    <p>Beskrivning: Returnerar en enskild film baserat på id.</p>
    <p>HTTP-metod: GET</p>
    
    <h2>POST /movies</h2>
    <p>Beskrivning: Skapar en ny film och lägger till den i databasen.</p>
    <p>HTTP-metod: POST</p>
  `;
  res.send(documentation);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

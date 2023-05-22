const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
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
const { Console } = require("console");

function hash(data) {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

app.post("/movies", (req, res, next) => {
  console.log("movies");
  if (req.body.titel && req.body.director && req.body.year) {
    let sql = `SELECT * from movies  WHERE Titel = "${req.body.titel}"`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length === 0) {
        let sql = `INSERT INTO movies (titel, director, year) VALUES ("${req.body.titel}", "${req.body.director}", "${req.body.year}")`; // Skapar en användare med datan som skickas in

        con.query(sql, function (err, result, fields) {
          const createdMovies = result.insertId;
          if (err) throw err;
          res.status(201).json({
            updatedId: createdMovies,
          });
        });
      } else {
        res.status(400).json({
          message: "Movie already taken.",
        });
      }
    });
  }
});

// <html>
//   <body>
//     // <h1>API routes:</h1>
//     <ul>
//       // ${routes.map((r) => `<li>${r.path}: ${r.description}</li>`).join("")}
//     </ul>
//   </body>
// </html>;

//res.send(html);

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

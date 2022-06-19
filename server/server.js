const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

const db = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: 'rootroot',
   database: 'mysql_app'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
   const sqlSelect = "SELECT * FROM reviews;";
   db.query(sqlSelect, (err, result) => {
      res.send(result);
   });
});

app.post('/api/insert', (req, res) => {
   const movieName = req.body.movieName;
   const review = req.body.review;

   const sqlInsert = "INSERT INTO reviews (movieName, review) VALUES (?, ?);";
   db.query(sqlInsert, [ movieName, review ], (err, result) => {
      res.send(result);
   });
});

app.listen(3001, () => {
   console.log("Running on port 3001");
});
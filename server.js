const express = require('express');
const app = express();
const port = 3001;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.db');  
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post("/registration", (req, res) => {
    let result = {
        error: ""
    }

    db.run("INSERT INTO Users(email, name, surname, city, password) VALUES (?, ?, ?, ?, ?)", [req.body.email, req.body.name, req.body.surname, req.body.city, req.body.password], (err) => {
        if (err) {
            res.status(409).send(err);
            return console.log(err.message)
        } 
        result = {
            email: req.body.email,
            city: req.body.city
        }

        res.send(result)
    })
})

app.post("/auth", (req, res) => {
    let result = {}

    db.all('SELECT password, city FROM Users WHERE email=?', [req.body.email], (err, row) => {
        if (err) {
            res.status(409).send(err)
            return console.log(err.message);
        } else {
            let password = row[0].password
            let userPassword = req.body.password

            if (password === userPassword) {
                result = {
                    email: req.body.email,
                    city: row[0].city
                }
                res.send(result)
            } else {
                res.status(403).send(result)
            }
        }
    });
})

app.get("/getproducts", (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            res.status(500).send(err)
            return console.log(err.message);
        } else {
            res.send(rows)
        }
    })
})

app.listen(port, () => {
    console.log(`Examplle app listening on port http://localhost:${port}/`);
})
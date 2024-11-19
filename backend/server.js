import express from 'express';
import 'dotenv/config'
const app = express();
const port = 3001;
import cors from 'cors';
import jwt from 'jsonwebtoken'
import db from './db.js';
import authMiddleware from './middleware.js';

app.use(express.json());
app.use(cors());


app.post("/registration", (req, res) => {
    db.run("INSERT INTO Users(email, name, surname, city, password) VALUES (?, ?, ?, ?, ?)", [req.body.email, req.body.name, req.body.surname, req.body.city, req.body.password], (err) => {
        if (err) {
            res.status(409).send(err);
            return console.log(err.message)
        } 
        
        db.all("SELECT id FROM Users WHERE email = ?", [req.body.email], (err, row) => {
            if (err) {
                res.status(401).send(err);
                return console.log(err.message)
            } else {
                try {
                    let id = row[0].id
                    const token = jwt.sign(
                        { 
                          userId: id
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '24h' }
                    );
                    res.send({token});
                } catch (error) {
                    res.status(500).send('Login failed' );
                    console.log(error)
                }
            }
        })
    })
})

app.post("/auth", (req, res) => {

    db.all('SELECT password, city, id FROM Users WHERE email=?', [req.body.email], (err, row) => {
        if (err) {
            res.status(409).send(err)
            return console.log(err.message);
        } else {
            let password = row[0].password
            let userPassword = req.body.password

            if (password === userPassword) {
                try {
                    let id = row[0].id
                    const token = jwt.sign(
                        { 
                          userId: id
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '24h' }
                    );
                    res.send({token});
                } catch (error) {
                    res.status(500).send('Login failed' );
                    console.log(error)
                }
            } else {
                res.status(403).send("Wrong password")
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

app.post("/getproductbyid", (req, res) => {
    let productIds = req.body.likedIds // array of ids
    
    const placeholders = productIds.map(() => '?').join(',');
    const query = `SELECT * FROM products WHERE id IN (${placeholders})`;

    db.all(query, productIds, (err, rows) => {
        if (err) {
            res.status(500).send(err)
            return console.log(err.message)
        }
        res.send(rows);
    });
})

app.get("/getliked", authMiddleware, (req, res) => {
    let userId = req.user.id

    db.all("SELECT productId FROM liked WHERE userId = ?", [userId], (err, rows) => {
        if (err) {
            res.status(500).send(err)
            return console.log(err.message)
        }

        res.send(rows) //send <{liked: <stroke>}>
    })
})

app.delete("/deletelike", authMiddleware, (req, res) => {
    let userId = req.user.id
    let productId = req.body.productId

    db.run("DELETE FROM liked WHERE userId = ? AND productId = ?", [userId, productId], (err, row) => {
        if (err) {
            res.status(500).send(err)
            return console.log(err.message)
        }
        let result = {
            error: "none"
        }
        res.send(result)
    })
})

app.post("/addlike", authMiddleware, (req, res) => {


    let userId = req.user.id
    let productId = req.body.productId
    let result = {}

    db.run("INSERT INTO liked(userId, productId) VALUES (?, ?)", [userId, productId], (err) => {
        if (err) {
            res.status(409).send(err);
            return console.log(err.message)
        }
    })
})

app.get("/getbasket", authMiddleware, (req, res) => {
    let userId = req.user.id

    db.all("SELECT b.productId, b.count, p.* FROM basket b LEFT JOIN products p ON b.productId = p.id WHERE b.userId = ? GROUP BY b.productId, p.id;", [userId], (err, rows) => {
        if (err) {
            res.status(500).send(err)
            return console.log(err.message)
        }
        res.send(rows) //send <{liked: <stroke>}>
    })
})

app.post('/getbasketbyids', authMiddleware, (req, res) => {
    let userId = req.user.id

    db.all("SELECT count FROM basket WHERE userId = ? AND productId = ?", [userId, req.body.productId], (err, row) => {
        if (err) {
            res.status(500).send(err)
            return console.log(err.message)
        }
        res.send(row[0])
    })
})

app.post("/updatebasketcount", authMiddleware, (req, res) => {
    let userId = req.user.id

    db.run("UPDATE basket SET count = ? WHERE userId = ? AND productId = ?", [req.body.count, userId, req.body.productId], (err, row) => {
        if (err) {
            res.status(500).send(err)
            return console.log(err.message)
        }
    })
})

app.delete("/deletefrombasket", authMiddleware, (req, res) => {
    let userId = req.user.id
    let productId = req.body.productId

    db.run("DELETE FROM liked WHERE userId = ? AND productId = ?", [userId, productId], (err, row) => {
        if (err) {
            res.status(500).send(err)
            return console.log(err.message)
        }
        let result = {
            error: "none"
        }
        res.send(result)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}/`);
})
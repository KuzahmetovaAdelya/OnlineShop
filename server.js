const express = require('express');
const app = express();
const port = 3001;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.db');  

app.use(express.json());

// console.log(db)

// app.get('/', (req, res) => {
//     let student = {
//         name: 'John',
//         age: 30,
//         isAdmin: false,
//         courses: ['html', 'css', 'js'],
//         wife: null
//     };

//     let ids = []

//     db.all('SELECT id FROM Users', (err, rows) => {
//         if (err) {
//           console.error(err.message);
//         } else {
//             for (let i = 0; i < rows.length; i++) {
//                 let row = rows[i]
//                 let id = row.id
//                 ids.push(id)
//             }
//             let json = JSON.stringify(ids)
//             res.send(json);
//         }
//     });
// });

app.post("/registration", (req, res) => {
    console.log(req.body.name)

    db.run("INSERT INTO Users VALUES name=$name, surname=$surname, email=$email, password=$password", {
        $name: req.body.name,
        $surname: req.body.surname,
        $email: req.body.name,
        $name: req.body.name,
        $name: req.body.name,
    })
    // res.send(json)
})

app.get("/getusers", (req, res) => {
    let emails = []

    db.all('SELECT email FROM Users', (err, rows) => {
        if (err) {
          console.error(err.message);
        } else {
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i]
                let email = row.email
                emails.push(email)
            }

            let json = JSON.stringify(emails)
            res.send(json);
        }
    });
})

app.listen(port, () => {
    console.log(`Examplle app listening on port http://localhost:${port}/`);
})

// db.close((err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log('Closed the database connection.');
// });
const express = require('express');
const app = express();
const port = 3001;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE lorem (info TEXT)');
    const stmt = db.prepare('INSERT INTO lorem VALUES (?)');
  
    for (let i = 0; i < 10; i++) {
      stmt.run(`Ipsum ${i}`);
    }
  
    stmt.finalize();
  

});
  


app.get('/', (req, res) => {
    let student = {
        name: 'John',
        age: 30,
        isAdmin: false,
        courses: ['html', 'css', 'js'],
        wife: null
    };

    let response = [];
    db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
        if (err) {
          console.error(err.message);
        }
        response.push(`${row.id}: ${row.info}`);
        console.log(`${row.id}: ${row.info}`);
    });

    
    let json = JSON.stringify(response)
    res.send(json);
});

app.listen(port, () => {
    console.log(`Examplle app listening on port http://localhost:${port}/`);
})

// db.close((err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log('Closed the database connection.');
// });
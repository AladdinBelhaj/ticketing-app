const express = require('express');
const app = express();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cors = require('cors');



app.use(cors()); // allow request from different domains
app.use(express.json()); // create an express application

const connexion = mysql.createConnection({ // define database metadata
    host: 'localhost',
    user: 'root',
    password: 'issatm',
    database:'ticket-app-bd'
});

connexion.connect((err) => { // establish connection with database
    if(err){
        console.error("error",err);
        return;
    }
    console.log('Connected to database');
  });


  const secretKey = 'issatm123';


  app.post('/login', (req, res) => { // handle user login requests
    const { email, password } = req.body; // server expects email and password in request body
  
    connexion.query('SELECT * FROM client WHERE email = ?', email, (err, results) => { // query the database to find user
      if(err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Failed to log in' }); // error with database query
      } else if (results.length === 0) {
        res.status(401).json({ error: 'Invalid email or password' }); // user doesn't exist
      } else {
        const user = results[0];
  
        if(password !== user.password) {
          res.status(401).json({ error: 'Invalid email or password' }); // user exists, wrong password
        } else {
          const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { // user logs in
            expiresIn: '1h', // token expires in 1h
          });
  
          res.json({ token }); // server sends token as JSON response to client
        }
      }
    });
  });
  
  

  app.post('/project', (req, res) => {
    const { title, number, client, type, responsable, altResponsable } = req.body;
  
    const insertQuery = `INSERT INTO projet (title, numero, client, type, resp, resp_alt) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [title, number, client, type, responsable, altResponsable];

    // Execute the query
    connexion.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).json({ message: 'Error inserting data into the database' });
        return;
      }
  
      console.log('Data inserted successfully!');
      res.status(200).json({ message: 'Data inserted successfully' });
    });
  });














  // start server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
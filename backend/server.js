const express = require('express');
const app = express();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cors = require('cors');


// Allow all origins
app.use(cors());

app.use(express.json());



const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'issatm',
    database:'ticket-app-bd'
});

connexion.connect((err) => {
    if(err){
        console.error("erreur",err);
        return;
    }
    console.log('Connected to MySQL database!');
  });


  const secretKey = 'issatm123';


  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    connexion.query('SELECT * FROM client WHERE email = ?', email, (err, results) => {
      if (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Failed to log in' });
      } else if (results.length === 0) {
        res.status(401).json({ error: 'Invalid email or password' });
      } else {
        const user = results[0];
  
        if (password !== user.password) {
          res.status(401).json({ error: 'Invalid email or password' });
        } else {
          const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
            expiresIn: '1h', // Token will expire in 1 hour
          });
  
          res.json({ token });
        }
      }
    });
  });
  
  
  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
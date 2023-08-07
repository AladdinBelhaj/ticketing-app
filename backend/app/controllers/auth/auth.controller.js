const connexion = require('../db').connexion
const jwt = require('jsonwebtoken');


const secretKey = 'issatm123';


const login = (req, res) => { // handle user login requests
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
  };

  module.exports = {
    login
  }
const express = require('express');
const app = express();
const cors = require('cors');
const connexion = require('./app/controllers/db').connexion


app.use(cors()); // allow request from different domains
app.use(express.json()); // create an express application



connexion.connect((err) => { // establish connection with database
    if(err){
        console.error("error",err);
        return;
    }
    console.log('Connected to database');
  });




  require("./app/routes/auth.route")(app);
  
  

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
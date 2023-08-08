const express = require("express");
const cors = require("cors");
const connexion = require("../db").connexion;


const saveObject = (app) => {
    app.use(cors());
    app.post("/object", (req, res) => {
    const { title, classType } = req.body;
  
    const insertQuery = `INSERT INTO objet (title, class) VALUES (?, ?)`;
    const values = [title, classType];
  
    // Execute the query
    connexion.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error("Error inserting data into the database:", err);
        res
          .status(500)
          .json({ message: "Error inserting data into the database" });
        return;
      }
  
      console.log("Data inserted successfully!");
      res.status(200).json({ message: "Data inserted successfully" });
    });
  });
}

module.exports = saveObject;
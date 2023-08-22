const express = require("express");
const cors = require("cors");
const connexion = require("../db").connexion;


const saveProject = (app) => {
    app.use(cors());
    app.post("/project", (req, res) => {
    const { title, number, client, type, responsable, altResponsable } = req.body;
  
    const insertQuery = `INSERT INTO projet (title, numero, client, type, resp, resp_alt) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [title, number, client, type, responsable, altResponsable];
  
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

module.exports = saveProject;
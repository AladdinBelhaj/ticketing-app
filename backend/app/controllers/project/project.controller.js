const express = require("express");
const cors = require("cors");
const connexion = require("../db").connexion;

const saveProject = (app) => {
  app.use(cors());
  app.post("/projet", (req, res) => {
    const { title, number, client, type, responsable, altResponsable } =
      req.body;

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
  // Delete a projet by ID
  app.delete("/projet/:id", (req, res) => {
    const projectId = req.params.id;

    const deleteQuery = "DELETE FROM projet WHERE id = ?";

    connexion.query(deleteQuery, [projectId], (err, results) => {
      if (err) {
        console.error("Error deleting projet:", err);
        res.status(500).json({ message: "Error deleting projet" });
        return;
      }

      console.log("projet deleted successfully!");
      res.status(200).json({ message: "projet deleted successfully" });
    });
  });
  //get project by id:
  app.get("/projet/getbyid/:id", (req, res) => {
    const id = req.params.id;
    const selectQuery = "SELECT * FROM projet where id = ?";

    connexion.query(selectQuery, [id], (err, rows) => {
      res.status(200).json(rows[0]); // Sending all rows
    });
  });
};

module.exports = saveProject;

const express = require("express");
const cors = require("cors");
const connexion = require("../db").connexion;
const router = express.Router();

const setupObjectRoutes = (app) => {
  app.use(cors());
  app.use(express.json()); // Make sure to include this middleware for JSON parsing
  app.post("/object", (req, res) => {
    const { classType, title } = req.body;

    const insertQuery = `INSERT INTO objet (title, classType) VALUES (?, ?)`;
    const values = [title, classType];

    connexion.query(insertQuery, values, (error, results) => {
      if (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Error inserting data into database" });
      } else {
        console.log("Data inserted successfully");
        res.status(200).json({ message: "Data inserted successfully" });
      }
    });
  });
  //get all objects
  app.get("/objet", (req, res) => {
    const selectQuery = "SELECT * FROM objet";

    connexion.query(selectQuery, (error, results) => {
      if (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Error fetching data from database" });
      } else {
        console.log("Data fetched successfully");
        res.status(200).json(results);
      }
    });
  });
  // Delete a objet by ID
  app.delete("/objet/:id", (req, res) => {
    const objectId = req.params.id;

    const deleteQuery = "DELETE FROM objet WHERE id = ?";

    connexion.query(deleteQuery, [objectId], (err, results) => {
      if (err) {
        console.error("Error deleting objet:", err);
        res.status(500).json({ message: "Error deleting objet" });
        return;
      }

      console.log("objet deleted successfully!");
      res.status(200).json({ message: "objet deleted successfully" });
    });
  });
  //get object by is
  app.get("/objet/getbyid/:id", (req, res) => {
    const id = req.params.id;
    const selectQuery = "SELECT * FROM objet where id = ?";

    connexion.query(selectQuery, [id], (err, rows) => {
      res.status(200).json(rows[0]); // Sending all rows
    });
  });
  //get objects by user:
  app.get("/objet/:title", (req, res) => {
    const title = req.params.title;
    const selectQuery = "SELECT * FROM objet where title = ?";

    connexion.query(selectQuery, [title], (err, rows) => {
      if (err) {
        console.error("Error fetching objet:", err);
        res.status(500).json({ message: "Error fetching objet" });
        return;
      }

      res.status(200).json(rows); // Sending all rows
    });
  });
};

module.exports = setupObjectRoutes;

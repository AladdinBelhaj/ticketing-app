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
  app.get("/object", (req, res) => {
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
};

module.exports = setupObjectRoutes;

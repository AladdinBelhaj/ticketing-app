const express = require("express");
const cors = require("cors");
const connexion = require("../controllers/db").connexion;
const router = express.Router();

// Function to get the list of employes
const getEmployeList = () => {
  router.get("/employe", (req, res) => {
    const query = "SELECT name FROM employe"; 

    connexion.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching employes:", err);
        return res.status(500).json({ error: "Failed to fetch employes" });
      }

      const employeNames = results.map((row) => row.name);
      res.json(employeNames);
    });
  });

  return router; // Return the router instance
};

module.exports = getEmployeList;
const express = require("express");
const cors = require("cors");
const connexion = require("../controllers/db").connexion;
const router = express.Router();

// Function to get the list of clients
const getClientList = () => {
  router.get("/client", (req, res) => {
    const query = "SELECT name FROM client"; // Adjust the query based on your table structure

    connexion.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching clients:", err);
        return res.status(500).json({ error: "Failed to fetch clients" });
      }

      const clientNames = results.map((row) => row.name);
      res.json(clientNames);
    });
  });

  return router; // Return the router instance
};

module.exports = getClientList;
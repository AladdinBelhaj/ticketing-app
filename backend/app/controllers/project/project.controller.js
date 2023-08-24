const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const connexion = require("../db").connexion;

const saveProject = (app) => {
  app.use(cors());
  //posting
  app.post("/projet", (req, res) => {
    const projectData = req.body; // Assuming your Angular service sends the form data as JSON

    const insertQuery = "INSERT INTO projet SET ?";

    connexion.query(insertQuery, projectData, (err, results) => {
      if (err) {
        console.error("Error saving project:", err);
        res.status(500).json({ message: "Error saving project" });
        return;
      }

      console.log("Project saved successfully!");
      res.status(201).json({ message: "Project saved successfully" });
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

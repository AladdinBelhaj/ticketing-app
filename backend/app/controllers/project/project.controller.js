const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const connexion = require("../db").connexion;

const saveProject = (app) => {
  app.use(cors());

  app.post("/projet", (req, res) => {
    const projectData = req.body; // Assuming you're sending the project data in the request body

    const insertQuery =
      "INSERT INTO projet (title, number, client, type, responsable, altResponsable) VALUES (?, ?, ?, ?, ?, ?)";

    const values = [
      projectData.title,
      projectData.number,
      projectData.client,
      projectData.type,
      projectData.responsable,
      projectData.altResponsable,
    ];

    connexion.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error("Error saving project:", err);
        res.status(500).json({ message: "Error saving project" });
        return;
      }

      console.log("Project saved successfully!");
      res.status(200).json({ message: "Project saved successfully" });
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
  //update project
  app.put("/projet/:id", (req, res) => {
    const projectId = req.params.id;
    const { title, number, client, type, responsable, altResponsable } =
      req.body;

    let updateQuery =
      "UPDATE projet SET title = ?, number = ?, client = ?, type = ?, responsable = ?, altResponsable = ?";

    const updateValues = [
      title,
      number,
      client,
      type,
      responsable,
      altResponsable,
    ];
    updateQuery += " WHERE id = ?";

    updateValues.push(projectId);

    connexion.query(updateQuery, updateValues, (err, results) => {
      if (err) {
        console.error("Error updating project:", err);
        res.status(500).json({ message: "Error updating project" });
        return;
      }

      console.log("project updated successfully!");
      res.status(200).json({ message: "project updated successfully" });
    });
  });
};

module.exports = saveProject;

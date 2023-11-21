const express = require("express");
const multer = require("multer");
const cors = require("cors");
const connexion = require("../db").connexion;

const storage = multer.diskStorage({
  destination: "./app/controllers/ticket/uploads",
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

const upload = multer({ storage: storage });

const setupAddTicketRoutes = (app) => {
  app.use(cors());

  // Posting information
  app.post(
    "/ticket",
    upload.fields([{ name: "fichier" }, { name: "fichierSolution" }]),
    (req, res) => {
      if (!req.files) {
        return res.status(400).json({ message: "No files uploaded." });
      }

      const {
        projet,
        objet,
        emitteur,
        description,
        etat,
        responsable,
        descriptionSolution,
      } = req.body;

      const fichier = req.files["fichier"][0]; // "fichier" field
      const fichierSolution = req.files["fichierSolution"][0]; // "fichierSolution" field

      const insertQuery = `INSERT INTO ticket (projet, objet, emitteur, description, fichier, etat, responsable, descriptionSolution, fichierSolution) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        projet,
        objet,
        emitteur,
        description,
        fichier.filename, // Use the filename property of the uploaded file
        etat,
        responsable,
        descriptionSolution,
        fichierSolution.filename, // Use the filename property of the uploaded file
      ];

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
    }
  );

  //get the information from the project table:
  app.get("/projet", (req, res) => {
    const selectQuery = "SELECT * FROM projet";

    connexion.query(selectQuery, (err, rows) => {
      if (err) {
        console.error("Error fetching projet:", err);
        res.status(500).json({ message: "Error fetching projet" });
        return;
      }

      res.status(200).json(rows); // Sending all rows
    });
  });

  //update ticket
  app.put(
    "/ticket/:id",
    upload.fields([{ name: "fichier" }, { name: "fichierSolution" }]),
    (req, res) => {
      const ticketId = req.params.id;

      const {
        projet,
        objet,
        emitteur,
        description,
        etat,
        responsable,
        descriptionSolution,
      } = req.body;

      let updateQuery =
        "UPDATE ticket SET projet = ?, objet = ?, emitteur = ?, description = ?, etat = ?, responsable = ?, descriptionSolution = ?";

      const updateValues = [
        projet,
        objet,
        emitteur,
        description,
        etat,
        responsable,
        descriptionSolution,
      ];

      // Check if "fichierSolution" has been uploaded
      if (req.files && req.files["fichierSolution"]) {
        const fichierSolution = req.files["fichierSolution"][0]; // "fichierSolution" field

        updateQuery += ", fichierSolution = ?";
        updateValues.push(fichierSolution.filename);
      }

      updateQuery += " WHERE id = ?";

      updateValues.push(ticketId);

      connexion.query(updateQuery, updateValues, (err, results) => {
        if (err) {
          console.error("Error updating ticket:", err);
          res.status(500).json({ message: "Error updating ticket" });
          return;
        }

        console.log("Ticket updated successfully!");
        res.status(200).json({ message: "Ticket updated successfully" });
      });
    }
  );

  //get the information from the objet table:
  app.get("/objet", (req, res) => {
    const selectQuery = "SELECT * FROM objet";

    connexion.query(selectQuery, (err, rows) => {
      if (err) {
        console.error("Error fetching objet:", err);
        res.status(500).json({ message: "Error fetching objet" });
        return;
      }

      res.status(200).json(rows); // Sending all rows
    });
  });

  //get tickets by user:
  app.get("/ticket/:email", (req, res) => {
    const email = req.params.email;
    const selectQuery = "SELECT * FROM ticket where emitteur = ?";

    connexion.query(selectQuery, [email], (err, rows) => {
      if (err) {
        console.error("Error fetching objet:", err);
        res.status(500).json({ message: "Error fetching objet" });
        return;
      }

      res.status(200).json(rows); // Sending all rows
    });
  });
  app.get("/ticket", (req, res) => {
    const selectQuery = "SELECT * FROM ticket";
  
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
  // Delete a ticket by ID
  app.delete("/ticket/:id", (req, res) => {
    const ticketId = req.params.id;

    const deleteQuery = "DELETE FROM ticket WHERE id = ?";

    connexion.query(deleteQuery, [ticketId], (err, results) => {
      if (err) {
        console.error("Error deleting ticket:", err);
        res.status(500).json({ message: "Error deleting ticket" });
        return;
      }

      console.log("Ticket deleted successfully!");
      res.status(200).json({ message: "Ticket deleted successfully" });
    });
  });

  //get tickets by id:
  app.get("/ticket/getbyid/:id", (req, res) => {
    const id = req.params.id;
    const selectQuery = "SELECT * FROM ticket where id = ?";

    connexion.query(selectQuery, [id], (err, rows) => {
      if (err) {
        console.error("Error fetching objet:", err);
        res.status(500).json({ message: "Error fetching objet" });
        return;
      }

      res.status(200).json(rows[0]); // Sending all rows
    });
  });
};



module.exports = setupAddTicketRoutes;

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

  //posting information
  app.post("/ticket", upload.single("fichier"), (req, res) => {
    const {
      projet,
      objet,
      emitteur,
      description,
      etat,
      responsable,
      descriptionSolution,
      fichierSolution,
    } = req.body;

    const insertQuery = `INSERT INTO ticket (projet, objet, emitteur, description,fichier,etat,responsable,descriptionSolution,fichierSolution) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`;
    const values = [
      projet,
      objet,
      emitteur,
      description,
      req.file.filename,
      etat,
      responsable,
      descriptionSolution,
      fichierSolution,
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
  });

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
};

module.exports = setupAddTicketRoutes;

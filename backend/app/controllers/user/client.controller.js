const express = require("express");
const cors = require("cors");
const connexion = require("../db").connexion;
const router = express.Router();
const saveUser = (app) => {
  app.use(cors());

  
  app.post("/user", (req, res) => {
    const userData = req.body;

    const insertQuery =
      "INSERT INTO client (Nom, Prenom, NumTelephone, Role) VALUES (?, ?, ?, ?)";

    const values = [
      userData.Nom,
      userData.Prenom,
      userData.NumTelephone,
      userData.Role,
    ];

    connexion.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error("Error saving user:", err);
        res.status(500).json({ message: "Error saving user" });
        return;
      }

      console.log("user saved successfully!");
      res.status(200).json({ message: "user saved successfully" });
    });
  });
}
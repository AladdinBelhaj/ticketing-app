// const express = require("express");
// const cors = require("cors");
// const connexion = require("../db").connexion;
// const router = express.Router();
// const saveUser = (app) => {
//   app.use(cors());

//   app.post("/client", (req, res) => {
//     const userData = req.body;

//     const insertQuery =
//       "INSERT INTO client (Nom, Prenom, NumTelephone) VALUES (?, ?, ?)";

//     const values = [userData.Nom, userData.Prenom, userData.NumTelephone];

//     connexion.query(insertQuery, values, (err, results) => {
//       if (err) {
//         console.error("Error saving client:", err);
//         res.status(500).json({ message: "Error saving client" });
//         return;
//       }

//       console.log("client saved successfully!");
//       res.status(200).json({ message: "client saved successfully" });
//     });
//   });
// };

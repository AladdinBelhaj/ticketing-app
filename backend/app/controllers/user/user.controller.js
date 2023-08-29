const express = require("express");
const cors = require("cors");
const connexion = require("../db").connexion;
const router = express.Router();
const saveUser = (app) => {
  app.use(cors());
  app.post("/user", (req, res) => {
    const userData = req.body;

    const insertQuery =
      "INSERT INTO user (Nom, Prenom, NumTelephone, Role) VALUES (?, ?, ?, ?)";

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
  //get all users
  app.get("/user", (req, res) => {
    const selectQuery = "SELECT * FROM user";

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
  // Delete a user by ID
  app.delete("/user/:id", (req, res) => {
    const userId = req.params.id;

    const deleteQuery = "DELETE FROM user WHERE id = ?";

    connexion.query(deleteQuery, [userId], (err, results) => {
      if (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Error deleting user" });
        return;
      }

      console.log("user deleted successfully!");
      res.status(200).json({ message: "user deleted successfully" });
    });
  });
  //get user by id:
  app.get("/user/getbyid/:id", (req, res) => {
    const id = req.params.id;
    const selectQuery = "SELECT * FROM user where id = ?";

    connexion.query(selectQuery, [id], (err, rows) => {
      res.status(200).json(rows[0]); // Sending all rows
    });
  });
  //update user
  app.put("/user/:id", (req, res) => {
    const userId = req.params.id;
    const { Nom, Prenom, NumTelephone, Role } = req.body;

    let updateQuery =
      "UPDATE user SET Nom = ?, Prenom = ?, NumTelephone = ?, Role = ? ";

    const updateValues = [Nom, Prenom, NumTelephone, Role];
    updateQuery += " WHERE id = ?";

    updateValues.push(userId);

    connexion.query(updateQuery, updateValues, (err, results) => {
      if (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Error updating user" });
        return;
      }

      console.log("user updated successfully!");
      res.status(200).json({ message: "user updated successfully" });
    });
  });
};

module.exports = saveUser;

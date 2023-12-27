const express = require("express");
const cors = require("cors");
const connexion = require("../db").connexion;
var util = require("util");
const router = express.Router();
const saveUser = (app) => {
  app.use(cors());

  app.post("/user", async (req, res) => {
    const asyncQuery = util.promisify(connexion.query).bind(connexion);
    try {
      const userData = req.body;
      // Check if the email exists in the database
      let query = "SELECT * FROM user WHERE email = ?";
      let data = await asyncQuery(query, userData.email);

      if (data.length > 0) {
        // Email already exists in the database
        return res.status(400).json({ message: "Error: Email already exists" });
      }

      const insertQuery =
        "INSERT INTO user (Nom, Prenom, NumTelephone, Role, email, password) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [
        userData.Nom,
        userData.Prenom,
        userData.NumTelephone,
        userData.Role,
        userData.email,
        userData.password,
      ];

      if (userData.Role === "Client") {
        const insertClientQuery =
          "INSERT INTO client (Nom, Prenom, NumTelephone, Role, email, password) VALUES (?, ?, ?, ?, ?, ?)";
        await asyncQuery(insertClientQuery, values);
      } else if (userData.Role === "Employer") {
        const insertEmployerQuery =
          "INSERT INTO employe (Nom, Prenom, NumTelephone, Role, email, password) VALUES (?, ?, ?, ?, ?, ?)";
        await asyncQuery(insertEmployerQuery, values);
      }

      const result = await asyncQuery(insertQuery, values);
      console.log("User saved successfully!");
      res.status(200).json({ message: "User saved successfully" });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ message: "Error saving user" });
    }
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
    const { Nom, Prenom, NumTelephone, Role, email, password } = req.body;

    let updateQuery =
      "UPDATE user SET Nom = ?, Prenom = ?, NumTelephone = ?, Role = ? , email = ?, password = ?";

    const updateValues = [Nom, Prenom, NumTelephone, Role, email, password];
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
  //check email
  app.get("/user/checkEmail/:email", async (req, res) => {
    const { email } = req.params;

    try {
      const asyncQuery = util.promisify(connexion.query).bind(connexion);
      const query = "SELECT * FROM user WHERE email = ?";
      const data = await asyncQuery(query, [email]);

      if (data.length > 0) {
        res.status(200).json(true); // Email exists
      } else {
        res.status(200).json(false); // Email doesn't exist
      }
    } catch (error) {
      console.error("Error checking email:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

module.exports = saveUser;

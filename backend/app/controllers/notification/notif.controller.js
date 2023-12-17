const express = require("express");
const cors = require("cors");
const connexion = require("../db").connexion;
const router = express.Router();

const saveNotification = (app) => {
  app.use(cors());

  app.post("/notification", (req, res) => {
    const notificationData = req.body;

    const insertQuery =
      "INSERT INTO notification (notifText, sentTo) VALUES (?, ?)";

    const values = [notificationData.notifText, notificationData.sentTo];

    connexion.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error("Error saving notification:", err);
        res.status(500).json({ message: "Error saving notification" });
        return;
      }

      console.log("Notification saved successfully!");
      res.status(200).json({ message: "Notification saved successfully" });
    });
  });

  // Fetch notifications
  app.get("/notification", (req, res) => {
    const selectQuery = "SELECT * FROM notification";

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
  // Delete a notif by ID
  app.delete("/notification/:id", (req, res) => {
    const notifid = req.params.id;

    const deleteQuery = "DELETE FROM notification WHERE id = ?";

    connexion.query(deleteQuery, [notifid], (err, results) => {
      if (err) {
        console.error("Error deleting notification:", err);
        res.status(500).json({ message: "Error deleting notification" });
        return;
      }

      console.log("notification deleted successfully!");
      res.status(200).json({ message: "notification deleted successfully" });
    });
  });
};

module.exports = saveNotification;

const express = require("express");
const app = express();
const cors = require("cors");
const connexion = require("./app/controllers/db").connexion;

app.use(cors()); // allow request from different domains
app.use(express.json()); // create an express application

connexion.connect((err) => {
  // establish connection with database
  if (err) {
    console.error("error", err);
    return;
  }
  console.log("Connected to database");
});

require("./app/routes/auth.route")(app);



// Import and set up the addticket routes
const setupAddTicketRoutes = require("./app/controllers/ticket/addticket.controller.js");
setupAddTicketRoutes(app);


// Import and set up the addproject routes
const saveProject = require(".app/controllers/project/addproject.controller.js");
saveProject(app);

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

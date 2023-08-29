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
// Import and set up the object routes
const saveObject = require("./app/controllers/object/object.controller");
saveObject(app);
// Import and set up the project routes
const saveProject = require("./app/controllers/project/project.controller");
saveProject(app);

// Import and set up the user routes
const saveUser = require("./app/controllers/user/user.controller");
saveUser(app);



// import and set up getclient routes
const getClientList = require("./app/routes/client.route");
app.use(getClientList()); // Invoke getClientList and use the returned router

// import and set up getclient routes
const getEmployeList = require('./app/routes/employe.route');
app.use(getEmployeList());








// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


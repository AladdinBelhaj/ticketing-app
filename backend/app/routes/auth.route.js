
module.exports = app => {
var router = require("express").Router();
const logincontrollers = require("../controllers/auth/auth.controller")

router.post("/login",logincontrollers.login);

app.use('/',router);

}

//const users = require("../apiServices/users/routes.js");
const login     = require("../appViewServices/login/routes.js");
const home      = require("../appViewServices/home/routes.js");
const register  = require("../appViewServices/register/routes.js");
const logout  = require("../appViewServices/logout/routes.js");
var express = require("express");
var router = express.Router();

// GET  home page
//router.use ("/users", users);

router.use ("/login", login);
router.use ("/home",  home);
router.use ("/register", register);
router.use("/logout", logout);
module.exports = router;
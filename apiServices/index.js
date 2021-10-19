var express = require("express");
var router = express.Router();
const user       = require("./users/routes.js")    ;
const homeroutes    = require("./homeroutes/routes.js")    ;
const{error,isAuth} = require("../middleware/apiServices.js");

router.use(homeroutes);
// /api/user
router.use("/user" ,isAuth,user);
router.use(error);

module.exports = router;
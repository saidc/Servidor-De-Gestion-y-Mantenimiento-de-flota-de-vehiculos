
const login     = require("../appViewServices/login/routes.js")     ;
const home      = require("../appViewServices/home/routes.js")      ;
const register  = require("../appViewServices/register/routes.js")  ;
const logout    = require("../appViewServices/logout/routes.js")    ;
const api       = require("../apiServices/index.js")    ;
const {isAuth2,isAuth} = require("../middleware/appViewServices");
var express = require("express");
var router  = express.Router();

router.use ( "/api"     ,             api       );
router.use ( "/home"    ,  isAuth    ,home      );
router.use ( "/login"   ,  isAuth2   ,login     );
router.use ( "/logout"  ,  isAuth    ,logout    );
router.use ( "/register",  isAuth    ,register  );

module.exports = router;

//const users = require("../apiServices/users/routes.js");
const login     = require("../appViewServices/login/routes.js")     ;
const home      = require("../appViewServices/home/routes.js")      ;
const register  = require("../appViewServices/register/routes.js")  ;
const logout    = require("../appViewServices/logout/routes.js")    ;
const api       = require("../apiServices/index.js")    ;
var express = require("express");
var router = express.Router();

// GET  home page
//router.use ("/users", users);
var isAuth = (req, res,next)=>{
    console.log('Request URL:', req.originalUrl);
    if(req.session.isAuth){
        next();
    }else{
        res.redirect("/login");
    }
}
var isAuth2 = (req, res,next)=>{
    console.log('Request URL:', req.originalUrl);
    if(req.session.isAuth){
        res.redirect("/home");
    }else{
        next();
    }
}

router.use ("/login",     isAuth2 ,login);
router.use ("/home",      isAuth ,home);
router.use ("/register",  isAuth ,register);
router.use("/logout",     isAuth ,logout);
router.use("/api" ,api);

module.exports = router;
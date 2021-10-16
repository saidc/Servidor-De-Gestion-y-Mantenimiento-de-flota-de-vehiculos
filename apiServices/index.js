var express = require("express");
var router = express.Router();
const user       = require("./users/routes.js")    ;
var isAuth = (req, res,next)=>{
    console.log('Request URL:', req.originalUrl);
    if(req.session.isAuth){
        next();
    }else{
        res.json({haserror: true});
    }
}

router.use("/user" ,isAuth,user);

module.exports = router;
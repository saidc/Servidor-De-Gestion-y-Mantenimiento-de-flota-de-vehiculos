const express = require('express');
const controller = require('./controller');

const router = express.Router();
var isAuth = (req, res,next)=>{
    if(req.session.isAuth){
        next();
    }else{
        res.redirect("/login");
    }
}
router.post( "/",isAuth, controller.postRegister );
router.get ( "/",isAuth, controller.getRegister  );
module.exports = router;
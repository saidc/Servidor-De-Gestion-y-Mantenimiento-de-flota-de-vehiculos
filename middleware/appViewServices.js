module.exports.isAuth = (req, res,next)=>{
    console.log('Request URL:', req.originalUrl);
    if(req.session.isAuth){
        next();
    }else{
        res.redirect("/login");
    }
}

module.exports.isAuth2 = (req, res,next)=>{
    console.log('Request URL:', req.originalUrl);
    if(req.session.isAuth){
        res.redirect("/home");
    }else{
        next();
    }
}
module.exports.error404 = (req,res,next)=>{
    next(createError(404 , "page not found"));
}

module.exports.error = async ( req,res,next)=>{
    var auth = false;
    if( auth){
        res.redirect('/home');
    }else{
        res.redirect('/login');
    }
}

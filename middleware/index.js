module.exports.error = async (req,res,next)=>{
    console.log('Request URL:', req.originalUrl);
    if(req.session.isAuth){
        res.redirect('/home');
    }else{
        res.redirect('/login');
    }
}
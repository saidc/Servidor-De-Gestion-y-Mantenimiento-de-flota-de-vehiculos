
module.exports.error = async (req,res,next)=>{
    if(req.session.isAuth){
        res.redirect('/home');
    }else{
        res.redirect('/login');
    }
}
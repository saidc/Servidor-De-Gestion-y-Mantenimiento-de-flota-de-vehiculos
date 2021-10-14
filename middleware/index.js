
module.exports.error = async ( req,res,next)=>{
    var auth = false;
    if( auth){
        res.redirect('/home');
    }else{
        res.redirect('/login');
    }
}

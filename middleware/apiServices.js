module.exports.error = (req,res,next)=>{
    console.log('Request URL:', req.originalUrl);
    if(req.session.isAuth){
        res.status(404).json({error:true, msg:"ruta no encontrada"});
    }else{
        res.status(404).json({error: true , msg : "no esta autenticado"});
    }
}
module.exports.isAuth = (req, res,next)=>{
    console.log('Request URL:', req.originalUrl);
    if(req.session.isAuth){
        next();
    }else{
        res.status(404).json({error: true , msg : "no esta autenticado"});
    }
}
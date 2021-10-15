module.exports  = {
    postLogout(req, res){
        req.session.destroy((err)=>{
            if(err) throw err;
            res.redirect("/");
        });
    }
}

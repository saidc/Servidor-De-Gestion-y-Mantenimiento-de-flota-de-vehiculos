
module.exports  = {
    getUser(req, res){
        return res.status(200).json({error:false, msg:"se obtiene un usuario"});
    },
    createUser(req, res){
        return res.status(200).json({error:false,msg:"se crea usuario"});
    },
    updateUser(req, res){
        return res.status(200).json({error:false,msg:"se actuailza usuario"});
    },
    deleteUser(req, res){
        return res.status(200).json({error:false, msg:"se elimina un usuario"});
    }
}

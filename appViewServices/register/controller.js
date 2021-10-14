const viewPaths = require("../../views/views.js");

module.exports  = {
    async postRegister(req, res){
        try {
            const {username, email, password} = req.body;
            return res.status(200).json({hasError:false,msg:" variables recividas "});
        } catch (error) {
            return res.status(500).json({hasError:true,msg:" no se enviaron las variables necesitadas"});
            
        }
    },
    async getRegister(req, res){
        return res.status(200).sendFile(viewPaths.register);
    }
}
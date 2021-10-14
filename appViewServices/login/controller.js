
const viewPaths = require("../../views/views.js");
module.exports  = {
    getLogin(req, res){
        return res.status(200).sendFile(viewPaths.login);
    },
    postLogin(req, res){
        const {email, password} = req.body;
        return res.status(200).json({hasError: false, message:`no hay errores se obtuvo ${email} , ${password}`});
    }
}


const viewPaths = require("../../views/views.js");
const valid     = require("../../microservices/Validator.js");
const sql       = require("../../services/sql/index.js");
module.exports  = {
    getLogin(req, res){
        return res.status(200).sendFile(viewPaths.login);
    },
    postLogin(req, res){
        const {email, password} = req.body;
        if(!valid.isValidEmail(email) || !valid.isValidPassword(password)){
            return res.redirect('/login');
        }
        return res.status(200).json({hasError: false, message:`no hay errores se obtuvo ${email} , ${password}`});
    }
}


const viewPaths = require("../../views/views.js");
const valid     = require("../../microservices/Validator.js");
const {user}       = require("../../services/sql/index.js");
var bcrypt = require('bcryptjs');

module.exports  = {
    getLogin(req, res){
        return res.status(200).sendFile(viewPaths.login);
    },
    postLogin(req, res){
        const {email, password} = req.body;
        if(!valid.isValidEmail(email) || !valid.isValidPassword(password)){return res.redirect('/login');}
        user.GetID_USUARIO(email,(error, results, fields)=>{
            if(error){return res.redirect('/login');}
            if(results.length > 0){
                user.LeerUsuario(results[0].id,async (error2, results2, fields2)=>{
                    if(error2){return res.redirect('/login');}
                    if(results2.length > 0){
                        const {USUARIO, PASSWORD} = results2[0];
                        const isMatch = await bcrypt.compareSync(password,PASSWORD);
                        req.session.isAuth = true;
                        if(isMatch){
                            return res.redirect('/home');
                        }else{
                            return res.redirect('/register');
                        }
                        //  email               =   saidjoc@gmail.com 
                        //  password-hash       =   $2a$12$sLLTCULEtIyaQQkEa77myOMrnuCtjyfcrxKEOdjPXfBhZIcC5wMO6
                        //  password-original   =   abcd1234
                        
                    }
                });
            }
        });
        //return res.status(200).json({hasError: false, message:`no hay errores se obtuvo ${email} , ${password}`});
    }
}

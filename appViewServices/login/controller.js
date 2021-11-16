
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
        
        user.GetUser_by_USUARIO(email,async (error, results, fields)=>{
            console.log("llego aqui ")
            if(error){
                console.log(error)
                return res.redirect('/login');}
            if(results.length > 0){
                const {USUARIO, PASSWORD} = results[0];
                const isMatch = await bcrypt.compareSync(password,PASSWORD);
                if(isMatch){
                    req.session.isAuth = true;
                    return res.redirect('/home');
                }else{
                    return res.redirect('/login');
                }
            }else{
                return res.redirect('/login');
            }
        });
    }
}

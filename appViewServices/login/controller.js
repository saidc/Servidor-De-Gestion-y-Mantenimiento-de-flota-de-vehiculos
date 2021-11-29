
const viewPaths = require("../../views/views.js");
const valid     = require("../../microservices/Validator.js");
const {usuario}       = require("../../services/sql/index.js");
var bcrypt = require('bcryptjs');

module.exports  = {
    getLogin(req, res){
        return res.status(200).sendFile(viewPaths.login);
    },
    postLogin(req, res){
        const {email, password} = req.body;
        
        if(!valid.isValidEmail(email) || !valid.isValidPassword(password)){return res.redirect('/login');}
        
        usuario.GetUser_by_USUARIO(email,async (error, results, fields)=>{
            console.log("llego aqui ")
            if(error){
                console.log(error)
                return res.redirect('/login');}
            if(results.length > 0){
                const {ROL,CORREO, PASSWORD} = results[0];
                const isMatch = await bcrypt.compareSync(password,PASSWORD);
                console.log(isMatch,ROL,ROL == "ADMINISTRADOR")
                if(isMatch && ROL == "ADMINISTRADOR"){
                    req.session.isAuth = true;
                    req.session.user = email;
                    req.session.correo = CORREO;
                    req.session.rol = ROL;
                    var dnow = new Date(Date.now());
                    dnow.setMinutes(dnow.getMinutes()+60) // se añaden 30 min al tiempo actual
                    req.session.expires = dnow;
                    
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

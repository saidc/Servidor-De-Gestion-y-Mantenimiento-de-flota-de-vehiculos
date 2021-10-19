const {user} = require("../services/sql/index.js");

var bcrypt = require('bcryptjs'); // para generar hash de las contraseñas que se guardaran en la Base de datos 

var CrearUsuario = async(email, password, rol, cedula)=>{
    const hashedPsw = await bcrypt.hash(password, 12);
    console.log("password:",hashedPsw);
    user.CrearUsuario(email,hashedPsw,rol,cedula,(error, results, fields)=>{
        if(error){
            throw error;
        }
        console.log(results);
    });
}

//CrearUsuario("jolecorcar@gmail.com","abcd1234","trabajador","77016463");
//CrearUsuario("saidjoc@gmail.com","abcd1234","administrador","1140873219");

user.LeerUsuario(65,(error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results); 
});
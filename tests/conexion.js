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
//CrearUsuario("saidjoc@gmail.com","abcd1234","administrador","1140873219");

/* // Crear un Usuario
user.CrearUsuario("jazedsfr","12345asdf","trabajasdfdor","114087asdf321666",(error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results);
});
*/
/* // Actualizar Usuario
user.ActualizarUsuario(55,"juan","12345","conductor","74185296",(error,results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results);
});
*/
/*
 // Leer Usuario
user.LeerUsuario(65,(error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results); 
});
*/

user.GetUser_by_USUARIO("saidjoc@gmail.com",async (error, results, fields)=>{
    if(error){
        throw error;
    }
    if(results.length > 0){
        const {USUARIO, PASSWORD} = results[0];
        const password = "abcd1234";
        const isMatch = await bcrypt.compareSync(password,PASSWORD);
        console.log(results,isMatch);
        //  saidjoc@gmail.com 
        //  $2a$12$sLLTCULEtIyaQQkEa77myOMrnuCtjyfcrxKEOdjPXfBhZIcC5wMO6  
        //  abcd1234
    }else{
        console.log("no existe ese Usuario");
    }
});


/* // Elimina un usuario
user.EliminarUsuario(55,(error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results);
    if(results.affectedRows > 0){
        console.log("se elimino el usuario");
    }else{
        console.log("el usuario no existe");
    }
});
*/

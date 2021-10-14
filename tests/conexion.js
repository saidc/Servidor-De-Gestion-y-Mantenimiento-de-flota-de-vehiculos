const db = require("../services/sql/DataBase.js");

const user = db.user;
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
/* // Leer Usuario
user.LeerUsuario(55,(error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results);
});
*/
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
// finaliza la conexion
db.end();
// El tiempo online , 
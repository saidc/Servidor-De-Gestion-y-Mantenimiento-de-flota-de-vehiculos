console.log("Cargando Base de datos ...");

var mysql = require("mysql");

var sql_config = require("../../config/sql.js");

const user = require("./CRUD/usuario.js");

var conexion = mysql.createConnection(sql_config);

user.addConexion(conexion);

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("conexion exitosa");
    }
});

module.exports.end = ()=>{
    conexion.end(); 
}

module.exports.query = (query_str, inputs , callback)=>{
    conexion.query(query_str,inputs, callback);
}

module.exports.conexion = conexion;
module.exports.user = user;
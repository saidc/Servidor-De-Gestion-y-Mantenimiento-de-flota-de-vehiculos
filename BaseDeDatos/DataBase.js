console.log("Cargando Base de datos ...");

var mysql = require("mysql");
require('dotenv').config();

const user = require("./CRUD/usuario.js");

var conexion = mysql.createConnection({
    host:       process.env.DB_HOST,
    database:   process.env.DB_DATABASE,
    user:       process.env.DB_USER,
    password:   process.env.DB_PASWORD
});

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
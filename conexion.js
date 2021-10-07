var mysql = require("mysql");
require('dotenv').config();

var conexion = mysql.createConnection({
    host:       process.env.DB_HOST,
    database:   process.env.DB_DATABASE,
    user:       process.env.DB_USER,
    password:   process.env.DB_PASWORD
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("conexion exitosa");
    }
});

// finaliza la conexion
conexion.end();

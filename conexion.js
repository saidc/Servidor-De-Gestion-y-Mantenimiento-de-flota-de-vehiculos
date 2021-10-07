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
conexion.query("SELECT * FROM heroku_d887aadfd8b0128.usuario; ",(error, results, fields) =>{
    if(error){
        throw error;
    }
    console.log(results);
});

// finaliza la conexion
conexion.end();
// 2C3710DEB86A594120A43185687A70081AE9AB293C6100C8F8C94AA155C3B5DF
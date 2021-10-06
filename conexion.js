var mysql = require("mysql");

var conexion = mysql.createConnection({
    host: "us-cdbr-east-04.cleardb.com",
    database: "usuarios_db",
    user: "b08ae094de4bbb",
    password: "98b14354"
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

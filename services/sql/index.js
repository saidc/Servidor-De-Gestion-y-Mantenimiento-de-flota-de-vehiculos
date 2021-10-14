
var mysql = require("mysql");
var sql_config = require("../../config/sql.js");
const user = require("./CRUD/usuario.js");
var conexion;
var hasConexion = false;
function handleDisconnect() {
    console.log("Loading SQL database...");
    conexion = mysql.createConnection(sql_config);  // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    conexion.connect(function(err) {                // The server is either down
        if(err) {                                   // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);     // We introduce a delay before attempting to reconnect,
        }else{                                      // to avoid a hot loop, and to allow our node script to
            hasConexion = true;
            
            console.log("SQL Success Conexion");
        }
    });                                             // process asynchronous requests in the meantime.
                                                    // If you're also serving http, display a 503 error.
    conexion.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            hasConexion= false;
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}
handleDisconnect();
//var conexion = mysql.createConnection(sql_config);
//user.addConexion(conexion);
//conexion.connect(function(error){
//    if(error){
//        throw error;
//    }else{ 
//        console.log("SQL Success Conexion");
//    }
//});
module.exports.end = ()=>{ 
    conexion.end(); 
}
//module.exports.query = (query_str, inputs , callback)=>{
//    conexion.query(query_str,inputs, callback);
//}
//module.exports.conexion = conexion;

module.exports.user = user; 
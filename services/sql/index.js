
var mysql = require("mysql");
const sql_config = require("../../config/sql.js");
const usuario = require("./CRUD/usuario.js");
const vehiculo = require("./CRUD/vehiculo.js");
const tipodevehiculo = require("./CRUD/tipodevehiculo.js");
const reporte = require("./CRUD/reporte.js")
const usuario_vehiculo = require("./CRUD/usuariovehiculo.js")
const alert = require("./CRUD/alerta.js")
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))  

var query = (query_str,input,callback)=>{
    //console.log("Connecting to database");
    /** Recreate the connection, since the old one cannot be reused. */
    const conexion = mysql.createConnection(sql_config);
    query_str = query_str.replace("123databasename321",String(sql_config.database))
    conexion.connect(async function(err) {          // The server is either down
        if(err) {                                   // or restarting (takes a while sometimes).
            //console.log('error when connecting to db:', err);
            //console.log('connection status:', conexion.state);
            //conexion = mysql.createConnection(sql_config);
            await delay(500);                      // We introduce a delay before attempting to reconnect,
            query(query_str,input,callback);
        }else{                                      // to avoid a hot loop, and to allow our node script
            //console.log("SQL Success Conexion in status:",conexion.state);
            //console.log("doing Query ");

            conexion.query(query_str,input, (error, results, fields)=>{
                conexion.end(); 
                //console.log("End Conexion");
                callback(error, results, fields);
            });
        }
    }); 
}

usuario.addQuery(query);
vehiculo.addQuery(query);
reporte.addQuery(query);
usuario_vehiculo.addQuery(query);
alert.addQuery(query);
tipodevehiculo.addQuery(query);

module.exports.usuario = usuario; 
module.exports.vehiculo = vehiculo; 
module.exports.reporte = reporte; 
module.exports.usuario_vehiculo = usuario_vehiculo; 
module.exports.alert = alert;
module.exports.tipodevehiculo = tipodevehiculo;

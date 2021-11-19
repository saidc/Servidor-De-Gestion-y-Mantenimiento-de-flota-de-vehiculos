const db_config = require("../../../config/sql.js");
// CRUD REPORTE
var conexion = null;
var DB_DATABASE = null;//db_config.DB_DATABASE ;

var query = (query_str,input,callback)=>{
    throw new Error("La variable de query no ha sido definida");
};
module.exports.addQuery = (que)=>{
    query = que; 
}

module.exports.addConexion = (con)=>{
    conexion = con;
}
module.exports.addDB_DATABASE_NAME = (name)=>{
    DB_DATABASE = name;
}

// CREATE    REPORTE
module.exports.CrearReporte = async (PLACA, FECHA, GRUPO, BATERIA, LATITUD, LONGITUD, SPEED, RPM, DISTANCE_W_MIL, DISTANCE_SINCE_DTC_CLEAR, ALERTA,USER, callback)=>{
    await query("INSERT INTO `123databasename321`.`reporte` (`PLACA`, `FECHA`, `GRUPO`, `BATERIA`, `LATITUD`, `LONGITUD`, `SPEED`, `RPM`, `DISTANCE_W_MIL`, `DISTANCE_SINCE_DTC_CLEAR`, `ALERTA` , `USER`) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? );",[PLACA, FECHA, GRUPO, BATERIA, LATITUD, LONGITUD, SPEED, RPM, DISTANCE_W_MIL, DISTANCE_SINCE_DTC_CLEAR, ALERTA, USER], callback);
}

// READ      REPORTE
module.exports.LeerReporte = async (ID , callback)=>{
    await query("SELECT * FROM 123databasename321.reporte WHERE (`id`= ? );",[ID],callback);
}
// UPDATE    REPORTE
module.exports.ActualizarReporte = async (ID, PLACA, FECHA, GRUPO, BATERIA, LATITUD, LONGITUD, SPEED, RPM, DISTANCE_W_MIL, DISTANCE_SINCE_DTC_CLEAR, ALERTA, callback)=>{
    var variables = [];
    var query_STR = "UPDATE `123databasename321`.`reporte` SET ";
     
    if( PLACA != null){ variables.push(PLACA); query_STR += "`PLACA`=?,"; }
    if( FECHA != null){ variables.push(FECHA); query_STR += "`FECHA`=?,"; }
    if( GRUPO != null){ variables.push(GRUPO); query_STR += "`GRUPO`=?,"; }
    if( BATERIA != null){ variables.push(BATERIA); query_STR += "`BATERIA`=?,"; }
    if( LATITUD != null){ variables.push(LATITUD); query_STR += "`LATITUD`=?,"; }
    if( LONGITUD != null){ variables.push(LONGITUD); query_STR += "`LONGITUD`=?,"; }
    if( SPEED != null){ variables.push(SPEED); query_STR += "`SPEED`=?,"; }
    if( RPM != null){ variables.push(RPM); query_STR += "`RPM`=?,"; }
    if( DISTANCE_W_MIL != null){ variables.push(DISTANCE_W_MIL); query_STR += "`DISTANCE_W_MIL`=?,"; }
    if( DISTANCE_SINCE_DTC_CLEAR != null){ variables.push(DISTANCE_SINCE_DTC_CLEAR); query_STR += "`DISTANCE_SINCE_DTC_CLEAR`=?,"; }
    if( ALERTA != null){ variables.push(ALERTA); query_STR += "`ALERTA`=?"; }

    variables.push(ID);
    query_STR += " WHERE (`id` = ?);";
    await query(query_STR,variables,callback);
}
// DELETE    REPORTE
module.exports.EliminarReporte= async (ID,callback)=>{
    await query("DELETE FROM `123databasename321`.`reporte` WHERE (`id` = ?);",[ID],callback);
}
// Get REPORT BETWEEN DOS FECHAS HORA
module.exports.getReporte_por_id_fecha_hora = async (PLACA, Fecha_inicial, Fecha_final, callback)=>{
    await query("SELECT * FROM 123databasename321.reporte WHERE (PLACA = ? and (FECHA between ? and ?) );",[PLACA,Fecha_inicial,Fecha_final],callback);
}
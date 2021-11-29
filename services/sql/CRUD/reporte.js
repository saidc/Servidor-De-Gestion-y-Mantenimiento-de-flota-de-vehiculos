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
module.exports.CrearReporte = async (PLACA_DE_VEHICULO, FECHA, GRUPO, BATERIA, LATITUD, LONGITUD, SPEED, RPM, DISTANCE_W_MIL, DISTANCE_SINCE_DTC_CLEAR, ESTADO_DE_VEHICULO,USER, callback)=>{
    await query("INSERT INTO `123databasename321`.`reporte` (`PLACA_DE_VEHICULO`, `FECHA`, `GRUPO`, `BATERIA`, `LATITUD`, `LONGITUD`, `SPEED`, `RPM`, `DISTANCE_W_MIL`, `DISTANCE_SINCE_DTC_CLEAR`, `ESTADO_DE_VEHICULO` , `USER`) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? );",[PLACA_DE_VEHICULO, FECHA, GRUPO, BATERIA, LATITUD, LONGITUD, SPEED, RPM, DISTANCE_W_MIL, DISTANCE_SINCE_DTC_CLEAR, ESTADO_DE_VEHICULO, USER], callback);
}

// READ      REPORTE
module.exports.LeerReporte = async (ID , callback)=>{
    await query("SELECT * FROM 123databasename321.reporte WHERE (`id`= ? );",[ID],callback);
}
// UPDATE    REPORTE
module.exports.ActualizarReporte = async (ID, PLACA_DE_VEHICULO, FECHA, GRUPO, BATERIA, LATITUD, LONGITUD, SPEED, RPM, DISTANCE_W_MIL, DISTANCE_SINCE_DTC_CLEAR, ESTADO_DE_VEHICULO,USER, callback)=>{
    var variables = [];
    var query_STR = "UPDATE `123databasename321`.`reporte` SET ";
     
    if( PLACA_DE_VEHICULO != null){ variables.push(PLACA_DE_VEHICULO); query_STR += "`PLACA_DE_VEHICULO`=?,"; }
    if( FECHA != null){ variables.push(FECHA); query_STR += "`FECHA`=?,"; }
    if( GRUPO != null){ variables.push(GRUPO); query_STR += "`GRUPO`=?,"; }
    if( BATERIA != null){ variables.push(BATERIA); query_STR += "`BATERIA`=?,"; }
    if( LATITUD != null){ variables.push(LATITUD); query_STR += "`LATITUD`=?,"; }
    if( LONGITUD != null){ variables.push(LONGITUD); query_STR += "`LONGITUD`=?,"; }
    if( SPEED != null){ variables.push(SPEED); query_STR += "`SPEED`=?,"; }
    if( RPM != null){ variables.push(RPM); query_STR += "`RPM`=?,"; }
    if( DISTANCE_W_MIL != null){ variables.push(DISTANCE_W_MIL); query_STR += "`DISTANCE_W_MIL`=?,"; }
    if( DISTANCE_SINCE_DTC_CLEAR != null){ variables.push(DISTANCE_SINCE_DTC_CLEAR); query_STR += "`DISTANCE_SINCE_DTC_CLEAR`=?,"; }
    if( ESTADO_DE_VEHICULO != null){ variables.push(ESTADO_DE_VEHICULO); query_STR += "`ESTADO_DE_VEHICULO`=?,"; }
    if( USER != null){ variables.push(USER); query_STR += "`USER`=?,"; }
    
    query_str = removechar(query_str, query_str.length -1)

    variables.push(ID);
    query_STR += " WHERE (`id` = ?);";
    await query(query_STR,variables,callback);
}
// DELETE    REPORTE
module.exports.EliminarReporte= async (ID,callback)=>{
    await query("DELETE FROM `123databasename321`.`reporte` WHERE (`id` = ?);",[ID],callback);
}
// Get REPORT BETWEEN DOS FECHAS HORA
module.exports.getReporte_by_estado_fecha_hora = async (PLACA_DE_VEHICULO ,ESTADO_DE_VEHICULO, Fecha_inicial, Fecha_final, callback)=>{
    if(ESTADO_DE_VEHICULO == ""){
        
        await query("SELECT * FROM 123databasename321.reporte WHERE (PLACA_DE_VEHICULO = ?) and (FECHA between ? and ?) ;",[PLACA_DE_VEHICULO,Fecha_inicial,Fecha_final],callback);
    }else{
        await query("SELECT * FROM 123databasename321.reporte WHERE (PLACA_DE_VEHICULO = ?) and ((ESTADO_DE_VEHICULO = ? ) and (FECHA between ? and ?) );",[PLACA_DE_VEHICULO,ESTADO_DE_VEHICULO,Fecha_inicial,Fecha_final],callback);

    }
}
// Get REPORT BETWEEN DOS FECHAS HORA
module.exports.getReporte_by_placa = async (PLACA_DE_VEHICULO, callback)=>{
    await query("SELECT * FROM 123databasename321.reporte WHERE (PLACA_DE_VEHICULO = ?) ORDER BY FECHA DESC LIMIT 100;",[PLACA_DE_VEHICULO],callback);
}// SELECT * FROM 123databasename321.reporte WHERE (PLACA_DE_VEHICULO = 'FWW722') ORDER BY FECHA DESC LIMIT 100; FWW722
//  GetColums names
module.exports.GetColumnsNames = async (callback)=>{
    await query("SHOW COLUMNS FROM 123databasename321.reporte ;",[],callback);
}

var removechar=(str,pos)=>{ return ( pos >= str.length || pos < 0 || str.length == 0)? (str): (pos == 0)? (str.slice(1)): (pos == str.length -1 )? (str.slice(0,pos)) :(str.slice(0,pos)+str.slice(pos+1)) }
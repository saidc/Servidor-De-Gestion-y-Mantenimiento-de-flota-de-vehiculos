const db_config = require("../../../config/sql.js");
// CRUD REPORTE
var conexion = null;
var DB_DATABASE = null;//db_config.DB_DATABASE ;

module.exports.addConexion = (con)=>{
    conexion = con;
}
module.exports.addDB_DATABASE_NAME = (name)=>{
    DB_DATABASE = name;
}

// CREATE    REPORTE
module.exports.CrearReporte = (id_Vehiculo, FECHA, HORA, GRUPO, ALIAS, BATERIA, LATITUD, LONGITUD, SPEED, RPM, DISTANCE_W_MIL, DISTANCE_SINCE_DTC_CLEAR, ALERTA, callback)=>{
    if(conexion == null){ 
        throw new Error("La variable de Conexion no ha sido definida");
    }else{
        conexion.query("INSERT INTO `123databasename321`.`reporte` (`id_Vehiculo`, `FECHA`, `HORA`, `GRUPO`, `ALIAS`, `BATERIA`, `LATITUD`, `LONGITUD`, `SPEED`, `RPM`, `DISTANCE_W_MIL`, `DISTANCE_SINCE_DTC_CLEAR`, `ALERTA`) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? );",[id_Vehiculo, FECHA, HORA, GRUPO, ALIAS, BATERIA, LATITUD, LONGITUD, SPEED, RPM, DISTANCE_W_MIL, DISTANCE_SINCE_DTC_CLEAR, ALERTA], callback);
    }
}
// READ      REPORTE
module.exports.LeerReporte = (ID , callback)=>{
    if(conexion == null){ 
        throw new Error("La variable de Conexion no ha sido definida");
    }else{
        conexion.query("SELECT * FROM 123databasename321.reporte WHERE (`id`= ? );",[ID],callback);
    }
}
// UPDATE    REPORTE
module.exports.ActualizarReporte = (ID, id_Vehiculo, FECHA, HORA, GRUPO, ALIAS, BATERIA, LATITUD, LONGITUD, SPEED, RPM, DISTANCE_W_MIL, DISTANCE_SINCE_DTC_CLEAR, ALERTA, callback)=>{
    if(conexion == null){ 
        throw new Error("La variable de Conexion no ha sido definida");
    }else{
        var variables = [];
        var query = "UPDATE `123databasename321`.`reporte` SET ";
         
        if( id_Vehiculo != null){ variables.push(id_Vehiculo); query += "`id_Vehiculo`=?,"; }
        if( FECHA != null){ variables.push(FECHA); query += "`FECHA`=?,"; }
        if( HORA != null){ variables.push(HORA); query += "`HORA`=?,"; }
        if( GRUPO != null){ variables.push(GRUPO); query += "`GRUPO`=?,"; }
        if( ALIAS != null){ variables.push(ALIAS); query += "`ALIAS`=?,"; }
        if( BATERIA != null){ variables.push(BATERIA); query += "`BATERIA`=?,"; }
        if( LATITUD != null){ variables.push(LATITUD); query += "`LATITUD`=?,"; }
        if( LONGITUD != null){ variables.push(LONGITUD); query += "`LONGITUD`=?,"; }
        if( SPEED != null){ variables.push(SPEED); query += "`SPEED`=?,"; }
        if( RPM != null){ variables.push(RPM); query += "`RPM`=?,"; }
        if( DISTANCE_W_MIL != null){ variables.push(DISTANCE_W_MIL); query += "`DISTANCE_W_MIL`=?,"; }
        if( DISTANCE_SINCE_DTC_CLEAR != null){ variables.push(DISTANCE_SINCE_DTC_CLEAR); query += "`DISTANCE_SINCE_DTC_CLEAR`=?,"; }
        if( ALERTA != null){ variables.push(ALERTA); query += "`ALERTA`=?"; }

        variables.push(ID);
        query += " WHERE (`id` = ?);";
        conexion.query(query,variables,callback);
    }
}
// DELETE    REPORTE
module.exports.EliminarReporte= (ID,callback)=>{
    if(conexion == null){ 
        throw new Error("La variable de Conexion no ha sido definida");
    }else{
        conexion.query("DELETE FROM `123databasename321`.`reporte` WHERE (`id` = ?);",[ID],callback);
    }
}

// Get REPORT BETWEEN DOS FECHAS HORA

module.exports.getReporte_por_id_fecha_hora = (ID, Fecha_inicial, Fecha_final, Hora_inicial, Hora_final, callback)=>{
    if(conexion == null){ 
        throw new Error("La variable de Conexion no ha sido definida");
    }else{
        //SELECT * FROM 123databasename321.reporte WHERE (id_Vehiculo = 5 and (FECHA between '2021-01-06' and '2021-01-07') and (HORA between '04:00:00' and '10:59:59' ));
        conexion.query("SELECT * FROM 123databasename321.reporte WHERE (id_Vehiculo = ? and (FECHA between ? and ?) and (HORA between ? and ? ));",[ID,Fecha_inicial,Fecha_final,Hora_inicial,Hora_final],callback);
    }
}
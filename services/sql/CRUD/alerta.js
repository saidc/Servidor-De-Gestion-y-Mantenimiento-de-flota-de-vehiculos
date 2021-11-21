// RD ALERTA

var query = (query_str,input,callback)=>{
    throw new Error("La variable de query no ha sido definida");
};

module.exports.addQuery = (que)=>{
    query = que;
}

// READ      ALERTA
module.exports.LeerAlerta = async (callback)=>{
    await query("SELECT * FROM 123databasename321.alerta;",[],callback);
}

// CREATE    ALERTA
module.exports.CrearAlerta = async(TIPODEALERTA, DESCRIPCION, PLACA, PRIORIDAD,FECHA, callback)=>{
    await query("INSERT INTO `123databasename321`.`alerta` (`TIPODEALERTA`, `DESCRIPCION`, `PLACA`, `PRIORIDAD` ,`FECHA`) VALUES ( ? , ? , ? , ? , ? );",[TIPODEALERTA, DESCRIPCION, PLACA, PRIORIDAD,FECHA], callback);
    // INSERT INTO `heroku_60b5845a2aabf7e`.`alerta` (`TIPODEALERTA`, `DESCRIPCION`, `PLACA`, `PRIORIDAD`) VALUES ( ? , ? , ?  , ? );
}

// OBTENER ALERTAS GENERADAS ENTRE DOS FECHAS HORA
module.exports.getAlertabetweenDatetime = async (PLACA, Fecha_inicial, Fecha_final, callback)=>{
    if(PLACA != NULL){
        await query("SELECT * FROM 123databasename321.reporte WHERE (PLACA = ? and (FECHA between ? and ?) );",[PLACA,Fecha_inicial,Fecha_final],callback);
    }else{
        await query("SELECT * FROM 123databasename321.reporte WHERE ((FECHA between ? and ?) );",[Fecha_inicial,Fecha_final],callback);
    }
}
        

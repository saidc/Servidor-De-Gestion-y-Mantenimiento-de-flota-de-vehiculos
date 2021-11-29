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
module.exports.CrearAlerta = async(TIPODEALERTA, DESCRIPCION, PLACA_DE_VEHICULO, PRIORIDAD,FECHA, callback)=>{
    await query("INSERT INTO `123databasename321`.`alerta` (`TIPODEALERTA`, `DESCRIPCION`, `PLACA_DE_VEHICULO`, `PRIORIDAD` ,`FECHA`) VALUES ( ? , ? , ? , ? , ? );",[TIPODEALERTA, DESCRIPCION, PLACA_DE_VEHICULO, PRIORIDAD,FECHA], callback);
    // INSERT INTO `heroku_60b5845a2aabf7e`.`alerta` (`TIPODEALERTA`, `DESCRIPCION`, `PLACA_DE_VEHICULO`, `PRIORIDAD`) VALUES ( ? , ? , ?  , ? );
}

// OBTENER ALERTAS GENERADAS ENTRE DOS FECHAS HORA
module.exports.getAlertabetweenDatetime = async (PLACA_DE_VEHICULO, Fecha_inicial, Fecha_final, callback)=>{
    if(PLACA_DE_VEHICULO != NULL){
        await query("SELECT * FROM 123databasename321.`alerta` WHERE (PLACA_DE_VEHICULO = ? and (FECHA between ? and ?) );",[PLACA_DE_VEHICULO,Fecha_inicial,Fecha_final],callback);
    }else{
        await query("SELECT * FROM 123databasename321.`alerta` WHERE ((FECHA between ? and ?) );",[Fecha_inicial,Fecha_final],callback);
    }
}
module.exports.getalertaPosNoRows = async ( PosicionFila ,NoFilas,callback)=>{
    await query("SELECT * FROM 123databasename321.`alerta` LIMIT ?,?;",[PosicionFila,NoFilas],callback);
}


// obtienen el numero de plandemantenimiento existentes
module.exports.getNumberOfAlertas = async ( callback)=>{
    await query("SELECT COUNT(*) as NumRow FROM 123databasename321.`alerta` ;",[],callback);
}

// READ plandemantenimiento
module.exports.getAlertabyId = async(ID , callback)=>{
    await query("SELECT * FROM 123databasename321.`alerta` WHERE (`id`= ? );",[ID],callback);
}

// DELETE plandemantenimiento
module.exports.Eliminaralerta = async(ID,callback)=>{
    await query("DELETE FROM `123databasename321`.`alerta` WHERE (`id` = ?);",[ID],callback);
}

//  GetColums names
module.exports.GetColumnsNames = async (callback)=>{
    await query("SHOW COLUMNS FROM 123databasename321.`alerta` ;",[],callback);
}

var removechar=(str,pos)=>{ return ( pos >= str.length || pos < 0 || str.length == 0)? (str): (pos == 0)? (str.slice(1)): (pos == str.length -1 )? (str.slice(0,pos)) :(str.slice(0,pos)+str.slice(pos+1)) }
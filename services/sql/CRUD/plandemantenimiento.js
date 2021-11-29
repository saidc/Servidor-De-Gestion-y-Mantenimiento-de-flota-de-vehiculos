// CRUD plandemantenimiento
var query = (query_str,input,callback)=>{
    throw new Error("La variable de query no ha sido definida");
};
module.exports.addQuery = (que)=>{
    query = que; 
}

// ver plandemantenimiento
module.exports.getplandemantenimiento = async( callback)=>{
    await query("SELECT * FROM 123databasename321.`plandemantenimiento`;",[],callback);
}
module.exports.getplandemantenimientoPosNoRows = async ( PosicionFila ,NoFilas,callback)=>{
    await query("SELECT * FROM 123databasename321.`plandemantenimiento` LIMIT ?,?;",[PosicionFila,NoFilas],callback);
}

// CREATE plandemantenimiento
module.exports.Crearplandemantenimiento = async( PLACA_DE_VEHICULO,id_rutinademantenimiento,FECHAINICIAL,FECHAFINAL,ESTADO_DE_PLAN,OBSERVACION, callback)=>{
    await query("INSERT INTO `123databasename321`.`plandemantenimiento` ( `PLACA_DE_VEHICULO`,`id_rutinademantenimiento`,`FECHAINICIAL`,`FECHAFINAL`,`ESTADO_DE_PLAN`,`OBSERVACION` ) VALUES ( ? , ? , ? , ? , ? , ? );",[ PLACA_DE_VEHICULO,id_rutinademantenimiento,FECHAINICIAL,FECHAFINAL,ESTADO_DE_PLAN,OBSERVACION ], callback);
}

// UPDATE plandemantenimiento
module.exports.Actualizarplandemantenimiento = async(ID, PLACA_DE_VEHICULO,id_rutinademantenimiento,FECHAINICIAL,FECHAFINAL,ESTADO_DE_PLAN,OBSERVACION, callback)=>{
    var variables = [];
    var query_str = "UPDATE `123databasename321`.`plandemantenimiento` SET ";
    
    if( PLACA_DE_VEHICULO != null && PLACA_DE_VEHICULO != "" ){ variables.push( PLACA_DE_VEHICULO ); query_str += " `PLACA_DE_VEHICULO` =?,";}
    if( id_rutinademantenimiento != null && id_rutinademantenimiento != "" ){ variables.push( id_rutinademantenimiento ); query_str += " `id_rutinademantenimiento` =?,";}
    if( FECHAINICIAL != null && FECHAINICIAL != "" ){ variables.push( FECHAINICIAL ); query_str += " `FECHAINICIAL` =?,";}
    if( FECHAFINAL != null && FECHAFINAL != "" ){ variables.push( FECHAFINAL ); query_str += " `FECHAFINAL` =?,";}
    if( ESTADO_DE_PLAN != null && ESTADO_DE_PLAN != "" ){ variables.push( ESTADO_DE_PLAN ); query_str += " `ESTADO_DE_PLAN` =?,";}
    if( OBSERVACION != null && OBSERVACION != "" ){ variables.push( OBSERVACION ); query_str += " `OBSERVACION` =?,";}
    
    query_str = removechar(query_str, query_str.length -1)

    variables.push(ID);
    query_str += " WHERE (`id` = ?);";
    await query(query_str,variables,callback); 
}

// obtienen el numero de plandemantenimiento existentes
module.exports.getNumberOfplandemantenimiento = async ( callback)=>{
    await query("SELECT COUNT(*) as NumRow FROM 123databasename321.`plandemantenimiento` ;",[],callback);
}
// READ plandemantenimiento
module.exports.getplandemantenimientobyId = async(ID , callback)=>{
    await query("SELECT * FROM 123databasename321.`plandemantenimiento` WHERE (`id`= ? );",[ID],callback);
}

// DELETE plandemantenimiento
module.exports.Eliminarplandemantenimiento = async(ID,callback)=>{
    await query("DELETE FROM `123databasename321`.`plandemantenimiento` WHERE (`id` = ?);",[ID],callback);
}

//  GetColums names
module.exports.GetColumnsNames = async (callback)=>{
    await query("SHOW COLUMNS FROM 123databasename321.`plandemantenimiento` ;",[],callback);
}
var removechar=(str,pos)=>{ return ( pos >= str.length || pos < 0 || str.length == 0)? (str): (pos == 0)? (str.slice(1)): (pos == str.length -1 )? (str.slice(0,pos)) :(str.slice(0,pos)+str.slice(pos+1)) }

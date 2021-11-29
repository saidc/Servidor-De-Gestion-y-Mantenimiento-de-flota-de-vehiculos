// CRUD rutinademantenimiento
var query = (query_str,input,callback)=>{
    throw new Error("La variable de query no ha sido definida");
};
module.exports.addQuery = (que)=>{
    query = que; 
}

// ver rutinademantenimiento
module.exports.getrutinademantenimiento = async( callback)=>{
    await query("SELECT * FROM 123databasename321.`rutinademantenimiento`;",[],callback);
}
module.exports.getrutinademantenimientoPosNoRows = async ( PosicionFila ,NoFilas,callback)=>{
    await query("SELECT * FROM 123databasename321.`rutinademantenimiento` LIMIT ?,?;",[PosicionFila,NoFilas],callback);
}

// CREATE rutinademantenimiento
module.exports.Crearrutinademantenimiento = async( TIEMPO, MEDICION_DE_TIEMPO, DISTANCIA, MEDICION_DE_DISTANCIA, DESCRIPCION, ESTADO_DE_RUTINA, TIPO_DE_RUTINA, PLACA_DE_VEHICULO, id_tipodevehiculo, TITULO, OPERACION_DE_MANTENIMIENTO, callback)=>{
    await query("INSERT INTO `123databasename321`.`rutinademantenimiento` ( `TIEMPO`, `MEDICION_DE_TIEMPO`, `DISTANCIA`, `MEDICION_DE_DISTANCIA`, `DESCRIPCION`, `ESTADO_DE_RUTINA`, `TIPO_DE_RUTINA`, `PLACA_DE_VEHICULO`, `id_tipodevehiculo`, `TITULO`, `OPERACION_DE_MANTENIMIENTO`) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? );",[ TIEMPO, MEDICION_DE_TIEMPO, DISTANCIA, MEDICION_DE_DISTANCIA, DESCRIPCION, ESTADO_DE_RUTINA, TIPO_DE_RUTINA, PLACA_DE_VEHICULO, id_tipodevehiculo, TITULO, OPERACION_DE_MANTENIMIENTO ], callback);
}
// UPDATE rutinademantenimiento
module.exports.Actualizarrutinademantenimiento = async(ID, TIEMPO, MEDICION_DE_TIEMPO, DISTANCIA, MEDICION_DE_DISTANCIA, DESCRIPCION, ESTADO_DE_RUTINA, TIPO_DE_RUTINA, PLACA_DE_VEHICULO, id_tipodevehiculo, TITULO, OPERACION_DE_MANTENIMIENTO, callback)=>{
    var variables = [];
    var query_str = "UPDATE `123databasename321`.`rutinademantenimiento` SET ";
    
    if( TIEMPO != null && TIEMPO != "" ){ variables.push( TIEMPO ); query_str += " `TIEMPO` =?,";}
    if( MEDICION_DE_TIEMPO != null && MEDICION_DE_TIEMPO != "" ){ variables.push( MEDICION_DE_TIEMPO ); query_str += " `MEDICION_DE_TIEMPO` =?,";}
    if( DISTANCIA != null && DISTANCIA != "" ){ variables.push( DISTANCIA ); query_str += " `DISTANCIA` =?,";}
    if( MEDICION_DE_DISTANCIA != null && MEDICION_DE_DISTANCIA != "" ){ variables.push( MEDICION_DE_DISTANCIA ); query_str += " `MEDICION_DE_DISTANCIA` =?,";}
    if( DESCRIPCION != null && DESCRIPCION != "" ){ variables.push( DESCRIPCION ); query_str += " `DESCRIPCION` =?,";}
    if( ESTADO_DE_RUTINA != null && ESTADO_DE_RUTINA != "" ){ variables.push( ESTADO_DE_RUTINA ); query_str += " `ESTADO_DE_RUTINA` =?,";}
    if( TIPO_DE_RUTINA != null && TIPO_DE_RUTINA != "" ){ variables.push( TIPO_DE_RUTINA ); query_str += " `TIPO_DE_RUTINA` =?,";}
    if( PLACA_DE_VEHICULO != null && PLACA_DE_VEHICULO != "" ){ variables.push( PLACA_DE_VEHICULO ); query_str += " `PLACA_DE_VEHICULO` =?,";}
    if( id_tipodevehiculo != null && id_tipodevehiculo != "" ){ variables.push( id_tipodevehiculo ); query_str += " `id_tipodevehiculo` =?,";}
    if( TITULO != null && TITULO != "" ){ variables.push( TITULO ); query_str += " `TITULO` =?,";}
    if( OPERACION_DE_MANTENIMIENTO != null && OPERACION_DE_MANTENIMIENTO != "" ){ variables.push( OPERACION_DE_MANTENIMIENTO ); query_str += " `OPERACION_DE_MANTENIMIENTO` =?,";}
    
    query_str = removechar(query_str, query_str.length -1)

    variables.push(ID);
    query_str += " WHERE (`id` = ?);";
    await query(query_str,variables,callback);
}
// obtienen el numero de rutinademantenimiento existentes
module.exports.getNumberOfrutinademantenimiento = async ( callback)=>{
    await query("SELECT COUNT(*) as NumRow FROM 123databasename321.`rutinademantenimiento` ;",[],callback);
}

// READ rutinademantenimiento
module.exports.getrutinademantenimientobyId = async(ID , callback)=>{
    await query("SELECT * FROM 123databasename321.`rutinademantenimiento` WHERE (`id`= ? );",[ID],callback);
}

// DELETE rutinademantenimiento
module.exports.Eliminarrutinademantenimiento = async(ID,callback)=>{
    await query("DELETE FROM `123databasename321`.`rutinademantenimiento` WHERE (`id` = ?);",[ID],callback);
}

//  GetColums names
module.exports.GetColumnsNames = async (callback)=>{
    await query("SHOW COLUMNS FROM 123databasename321.`rutinademantenimiento` ;",[],callback);
}

var removechar=(str,pos)=>{ return ( pos >= str.length || pos < 0 || str.length == 0)? (str): (pos == 0)? (str.slice(1)): (pos == str.length -1 )? (str.slice(0,pos)) :(str.slice(0,pos)+str.slice(pos+1)) }


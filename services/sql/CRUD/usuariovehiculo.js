// CRUD usuario_vehiculo

var query = (query_str,input,callback)=>{
    throw new Error("La variable de query no ha sido definida");
};
module.exports.addQuery = (que)=>{
    query = que; 
}


// obtienen el numero de plandemantenimiento existentes
module.exports.getNumberOfusuario_vehiculo = async ( callback)=>{
    await query("SELECT COUNT(*) as NumRow FROM 123databasename321.`usuario_vehiculo` ;",[],callback);
}

module.exports.getusuario_vehiculoPosNoRows = async ( PosicionFila ,NoFilas,callback)=>{
    await query("SELECT * FROM 123databasename321.`usuario_vehiculo` LIMIT ?,?;",[PosicionFila,NoFilas],callback);
}

// CREATE usuario_vehiculo
module.exports.Crearusuario_vehiculo = async(PLACA_DE_VEHICULO, CORREO_DE_USUARIO , callback)=>{
    await query("INSERT INTO `123databasename321`.`usuario_vehiculo` ( `PLACA_DE_VEHICULO`, `CORREO_DE_USUARIO`) VALUES ( ? , ?);",[PLACA_DE_VEHICULO, CORREO_DE_USUARIO ], callback);
}

// UPDATE rutinademantenimiento
module.exports.Actualizarusuario_vehiculo = async(ID, PLACA_DE_VEHICULO, CORREO_DE_USUARIO , callback)=>{
    var variables = [];
    var query_str = "UPDATE `123databasename321`.`usuario_vehiculo` SET ";
     
    if( PLACA_DE_VEHICULO != null && PLACA_DE_VEHICULO != "" ){ variables.push( PLACA_DE_VEHICULO ); query_str += " `PLACA_DE_VEHICULO` =?,";}
    if( CORREO_DE_USUARIO != null && CORREO_DE_USUARIO != "" ){ variables.push( CORREO_DE_USUARIO ); query_str += " `CORREO_DE_USUARIO` =?,";}
    
    query_str = removechar(query_str, query_str.length -1)

    variables.push(ID);
    query_str += " WHERE (`id` = ?);";
    await query(query_str,variables,callback);
}
// get usuario by user_id take it from placa
module.exports.GetUsuario_byPlaca = async(PLACA_DE_VEHICULO , callback)=>{
    await query("SELECT * FROM heroku_60b5845a2aabf7e.usuario where CORREO in (select CORREO_DE_USUARIO From heroku_60b5845a2aabf7e.usuario_vehiculo where PLACA_DE_VEHICULO = ? );",[PLACA_DE_VEHICULO ], callback);
}

//  GetColums names
module.exports.GetColumnsNames = async (callback)=>{
    await query("SHOW COLUMNS FROM 123databasename321.`usuario_vehiculo` ;",[],callback);
}

// DELETE plandemantenimiento
module.exports.Eliminusuario_vehiculo= async(ID,callback)=>{
    await query("DELETE FROM `123databasename321`.`usuario_vehiculo` WHERE (`id` = ?);",[ID],callback);
}

var removechar=(str,pos)=>{ return ( pos >= str.length || pos < 0 || str.length == 0)? (str): (pos == 0)? (str.slice(1)): (pos == str.length -1 )? (str.slice(0,pos)) :(str.slice(0,pos)+str.slice(pos+1)) }
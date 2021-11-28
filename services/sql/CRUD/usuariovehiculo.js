// CRUD usuario_vehiculo

var query = (query_str,input,callback)=>{
    throw new Error("La variable de query no ha sido definida");
};
module.exports.addQuery = (que)=>{
    query = que; 
}

// CREATE usuario_vehiculo
module.exports.Crearusuario_vehiculo = async(PLACA_DE_VEHICULO, id_usuario , callback)=>{
    await query("INSERT INTO `123databasename321`.`usuario_vehiculo` ( `PLACA_DE_VEHICULO`, `id_usuario`) VALUES ( ? , ?);",[PLACA_DE_VEHICULO, id_usuario ], callback);
}

// get usuario by user_id take it from placa
module.exports.GetUsuario_byPlaca = async(PLACA_DE_VEHICULO , callback)=>{
    await query("SELECT * FROM heroku_60b5845a2aabf7e.usuario where id in (select id_usuario From heroku_60b5845a2aabf7e.usuario_vehiculo where PLACA_DE_VEHICULO = ? );",[PLACA_DE_VEHICULO ], callback);
}

//  GetColums names
module.exports.GetColumnsNames = async (callback)=>{
    await query("SHOW COLUMNS FROM 123databasename321.usuario_vehiculo ;",[],callback);
}

var removechar=(str,pos)=>{ return ( pos >= str.length || pos < 0 || str.length == 0)? (str): (pos == 0)? (str.slice(1)): (pos == str.length -1 )? (str.slice(0,pos)) :(str.slice(0,pos)+str.slice(pos+1)) }
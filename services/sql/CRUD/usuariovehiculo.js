// CRUD usuario_vehiculo

var query = (query_str,input,callback)=>{
    throw new Error("La variable de query no ha sido definida");
};
module.exports.addQuery = (que)=>{
    query = que; 
}

// CREATE usuario_vehiculo
module.exports.Crearusuario_vehiculo = async(PLACA, id_usuario , callback)=>{
    await query("INSERT INTO `123databasename321`.`usuario_vehiculo` ( `PLACA`, `id_usuario`) VALUES ( ? , ?);",[PLACA, id_usuario ], callback);
}

// get usuario by user_id take it from placa
module.exports.GetUsuario_byPlaca = async(PLACA , callback)=>{
    await query("SELECT * FROM heroku_60b5845a2aabf7e.usuario where id in (select id_usuario From heroku_60b5845a2aabf7e.usuario_vehiculo where PLACA = ? );",[PLACA ], callback);
}




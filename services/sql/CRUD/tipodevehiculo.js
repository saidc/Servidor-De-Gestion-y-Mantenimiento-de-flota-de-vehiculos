// CRUD tipodevehiculo
var query = (query_str,input,callback)=>{
    throw new Error("La variable de query no ha sido definida");
};
module.exports.addQuery = (que)=>{
    query = que; 
}

// ver tiposdevehiculos
module.exports.gettiposdevehiculos = async( callback)=>{
    await query("SELECT * FROM 123databasename321.`tipodevehiculo`;",[],callback);
}
module.exports.gettiposdevehiculosPosNoRows = async ( PosicionFila ,NoFilas,callback)=>{
    await query("SELECT * FROM 123databasename321.`tipodevehiculo` LIMIT ?,?;",[PosicionFila,NoFilas],callback);
}

// CREATE tipodevehiculo
module.exports.Creartipodevehiculo = async( MARCA, LINEA, MODELO, callback)=>{
    await query("INSERT INTO `123databasename321`.`tipodevehiculo` ( `MARCA`, `LINEA`, `MODELO` ) VALUES ( ? , ? , ? );",[ MARCA, LINEA, MODELO ], callback);
}
// UPDATE tipodevehiculo
module.exports.Actualizartipodevehiculo = async(ID, MARCA, LINEA, MODELO, callback)=>{
    var variables = [];
    var query_str = "UPDATE `123databasename321`.`tipodevehiculo` SET ";
    if( MARCA != null && MARCA != ""){ variables.push(MARCA);    query_str += "`MARCA`=?,";}
    if( LINEA != null && LINEA != ""){ variables.push(LINEA);    query_str += "`LINEA`=?,";}
    if( MODELO != null && MODELO!= ""){ variables.push(MODELO);    query_str += "`MODELO`=?,";}
    query_str = removechar(query_str, query_str.length -1)
    variables.push(ID);
    query_str += " WHERE (`id` = ?);";
    await query(query_str,variables,callback);
}
// obtienen el numero de tipodevehiculos existentes
module.exports.getNumberOftipodevehiculo = async ( callback)=>{
    await query("SELECT COUNT(*) as NumRow FROM 123databasename321.`tipodevehiculo` ;",[],callback);
}
// READ tipodevehiculos
module.exports.gettipodevehiculosbyId = async(ID , callback)=>{
    await query("SELECT * FROM 123databasename321.`tipodevehiculo` WHERE (`id`= ? );",[ID],callback);
}

// DELETE tipodevehiculos
module.exports.Eliminartipodevehiculos = async(ID,callback)=>{
    await query("DELETE FROM `123databasename321`.`tipodevehiculo` WHERE (`id` = ?);",[ID],callback);
}
//  GetColums names
module.exports.GetColumnsNames = async (callback)=>{
    await query("SHOW COLUMNS FROM 123databasename321.`tipodevehiculo` ;",[],callback);
}

var removechar=(str,pos)=>{ return ( pos >= str.length || pos < 0 || str.length == 0)? (str): (pos == 0)? (str.slice(1)): (pos == str.length -1 )? (str.slice(0,pos)) :(str.slice(0,pos)+str.slice(pos+1)) }
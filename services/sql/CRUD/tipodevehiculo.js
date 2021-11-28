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
    await query("SELECT * FROM 123databasename321.tipodevehiculo LIMIT ?,?;",[PosicionFila,NoFilas],callback);
}

// CREATE tipodevehiculo
module.exports.Creartipodevehiculo = async( MARCA, LINEA, MODELO, callback)=>{
    await query("INSERT INTO `123databasename321`.`tipodevehiculo` ( `MARCA`, `LINEA`, `MODELO` ) VALUES ( ? , ? , ? );",[ MARCA, LINEA, MODELO ], callback);
}

// obtienen el numero de tipodevehiculos existentes
module.exports.getNumberOftipodevehiculo = async ( callback)=>{
    await query("SELECT COUNT(*) as NumRow FROM 123databasename321.tipodevehiculo ;",[],callback);
}

var removechar=(str,pos)=>{ return ( pos >= str.length || pos < 0 || str.length == 0)? (str): (pos == 0)? (str.slice(1)): (pos == str.length -1 )? (str.slice(0,pos)) :(str.slice(0,pos)+str.slice(pos+1)) }
// CRUD VEHICULO
var query = (query_str,input,callback)=>{
    throw new Error("La variable de query no ha sido definida");
};
module.exports.addQuery = (que)=>{
    query = que; 
}
// CREATE VEHICULO
module.exports.CrearVehiculo = async(ALIAS, PLACA, id_tipodevehiculo, CILINDRADA_CC,COLOR,SERVICIO,CLASE_DE_VEHICULO, TIPO_DE_CARROCERIA,COMBUSTIBLE,CAPACIDAD_KG_PSJ,NUMERO_DE_MOTOR,VIN,NUMERO_DE_SERIE,NUMERO_DE_CHASIS,PROPIETARIO,NIT,POTENCIA,DECLARACION_DE_IMPORTACION,FECHA_DE_IMPORTACION,PUERTAS,FECHA_MATRICULA,FECHA_EXP_LIC_TTO, callback)=>{
    await query("INSERT INTO `123databasename321`.`vehiculo` (`ALIAS`, `PLACA`, `id_tipodevehiculo`, `CILINDRADA CC`, `COLOR`, `SERVICIO`, `CLASE DE VEHICULO`, `TIPO DE CARROCERIA`, `COMBUSTIBLE`, `CAPACIDAD-KG-PSJ`, `NUMERO DE MOTOR`, `VIN`, `NUMERO DE SERIE`, `NUMERO DE CHASIS`, `PROPIETARIO`, `NIT`, `POTENCIA`, `DECLARACION DE IMPORTACION`, `FECHA DE IMPORTACION`, `PUERTAS`, `FECHA MATRICULA`, `FECHA EXP LIC TTO`) VALUES ( ? , ? , ?, ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?);",[ALIAS, PLACA, id_tipodevehiculo, CILINDRADA_CC, COLOR, SERVICIO, CLASE_DE_VEHICULO, TIPO_DE_CARROCERIA, COMBUSTIBLE, CAPACIDAD_KG_PSJ, NUMERO_DE_MOTOR, VIN, NUMERO_DE_SERIE, NUMERO_DE_CHASIS, PROPIETARIO, NIT, POTENCIA, DECLARACION_DE_IMPORTACION, FECHA_DE_IMPORTACION, PUERTAS, FECHA_MATRICULA, FECHA_EXP_LIC_TTO], callback);
}
// READ VEHICULO
module.exports.getVehiculobyId = async(ID , callback)=>{
    await query("SELECT * FROM 123databasename321.`vehiculo` WHERE (`id`= ? );",[ID],callback);
}

module.exports.getVehiculo = async( callback)=>{
    await query("SELECT PLACA FROM 123databasename321.`vehiculo`;",[],callback);
}
module.exports.getVehiculobyPlaca = async(Placa , callback)=>{
    await query("SELECT * FROM 123databasename321.`vehiculo` WHERE (PLACA = UPPER(?));",[Placa],callback);
}
module.exports.getVehiculosPosNoRows = async ( PosicionFila ,NoFilas,callback)=>{
    await query("SELECT * FROM 123databasename321.`vehiculo`LIMIT ?,?;",[PosicionFila,NoFilas],callback);
}
// obtienen el numero de vehiculos existentes
module.exports.getNumberOfVehiculos = async ( callback)=>{
    await query("SELECT COUNT(*) as NumRow FROM 123databasename321.`vehiculo` ;",[],callback);
}
// UPDATE VEHICULO
module.exports.ActualizarVehiculo = async(ID,ALIAS, PLACA, id_tipodevehiculo, CILINDRADA_CC,COLOR,SERVICIO,CLASE_DE_VEHICULO, TIPO_DE_CARROCERIA,COMBUSTIBLE,CAPACIDAD_KG_PSJ,NUMERO_DE_MOTOR,VIN,NUMERO_DE_SERIE,NUMERO_DE_CHASIS,PROPIETARIO,NIT,POTENCIA,DECLARACION_DE_IMPORTACION,FECHA_DE_IMPORTACION,PUERTAS,FECHA_MATRICULA,FECHA_EXP_LIC_TTO, callback)=>{
    var variables = [];
    var query_str = "UPDATE `123databasename321`.`vehiculo` SET ";
    if( ALIAS != null && ALIAS != ""){ variables.push(ALIAS);    query_str += "`ALIAS`=?,";}
    if( PLACA != null && PLACA != ""){ variables.push(PLACA);    query_str += "`PLACA`=?,";}
    if( id_tipodevehiculo != null && id_tipodevehiculo!= ""){ variables.push(id_tipodevehiculo);    query_str += "`id_tipodevehiculo`=?,";}
    if( CILINDRADA_CC != null && CILINDRADA_CC != ""){ variables.push(CILINDRADA_CC);  query_str += "`CILINDRADA CC`=?,";}
    if( COLOR != null && COLOR != ""){ variables.push(COLOR);                  query_str += "`COLOR`=?,";}
    if( SERVICIO != null && SERVICIO != ""){ variables.push(SERVICIO);            query_str += "`SERVICIO`=?," ;}
    if( CLASE_DE_VEHICULO != null && CLASE_DE_VEHICULO != ""){ variables.push(CLASE_DE_VEHICULO);      query_str += "`CLASE DE VEHICULO`=?,";}
    if( TIPO_DE_CARROCERIA != null && TIPO_DE_CARROCERIA != ""){ variables.push(TIPO_DE_CARROCERIA);    query_str += "`TIPO DE CARROCERIA`=?,";}
    if( COMBUSTIBLE != null && COMBUSTIBLE != ""){ variables.push(COMBUSTIBLE);            query_str += "`COMBUSTIBLE`=?,";}
    if( CAPACIDAD_KG_PSJ != null && CAPACIDAD_KG_PSJ != ""){ variables.push(CAPACIDAD_KG_PSJ);  query_str += "`CAPACIDAD_KG_PSJ`=?," ;}
    if( NUMERO_DE_MOTOR != null && NUMERO_DE_MOTOR != ""){ variables.push(NUMERO_DE_MOTOR);    query_str += "`NUMERO DE MOTOR`=?,";}
    if( VIN != null && VIN != ""){ variables.push(VIN);  query_str += "`VIN`=?,";}
    if( NUMERO_DE_SERIE != null && NUMERO_DE_SERIE != ""){ variables.push(NUMERO_DE_SERIE);    query_str += "`NUMERO DE SERIE`=?,";}
    if( NUMERO_DE_CHASIS != null && NUMERO_DE_CHASIS != ""){ variables.push(NUMERO_DE_CHASIS);  query_str += "`NUMERO DE CHASIS`=?," ;}
    if( PROPIETARIO != null && PROPIETARIO != ""){ variables.push(PROPIETARIO);  query_str += "`PROPIETARIO`=?,";}
    if( NIT != null && NIT != ""){ variables.push(NIT);  query_str += "`NIT`=?,";}
    if( POTENCIA != null && POTENCIA != ""){ variables.push(POTENCIA);  query_str += "`POTENCIA`=?,";}
    if( DECLARACION_DE_IMPORTACION != null && DECLARACION_DE_IMPORTACION != ""){ variables.push(DECLARACION_DE_IMPORTACION);  query_str += "`DECLARACION DE IMPORTACION`=?," ;}
    if( FECHA_DE_IMPORTACION != null && FECHA_DE_IMPORTACION != ""){ variables.push(FECHA_DE_IMPORTACION);  query_str += "`FECHA DE IMPORTACION`=?,";}
    if( PUERTAS != null && PUERTAS != ""){ variables.push(PUERTAS);  query_str += "`PUERTAS`=?,";}
    if( FECHA_MATRICULA != null && FECHA_MATRICULA != ""){ variables.push(FECHA_MATRICULA);  query_str += "`FECHA MATRICULA`=?,";}
    if( FECHA_EXP_LIC_TTO != null && FECHA_EXP_LIC_TTO != ""){ variables.push(FECHA_EXP_LIC_TTO);  query_str += "`FECHA EXP LIC TTO`=?," ;}
    query_str = removechar(query_str, query_str.length -1)
    variables.push(ID);
    query_str += " WHERE (`id` = ?);";
    await query(query_str,variables,callback);
}

// DELETE VEHICULO
module.exports.EliminarVehiculo = async(ID,callback)=>{
    await query("DELETE FROM `123databasename321`.`vehiculo` WHERE (`id` = ?);",[ID],callback);
}

// get Placa
module.exports.getID_Vehiculo = async(PLACA,callback)=>{
    await query("SELECT id FROM 123databasename321.`vehiculo` WHERE (PLACA = ? );",[PLACA],callback);
}
//  GetColums names
module.exports.GetColumnsNames = async (callback)=>{
    await query("SHOW COLUMNS FROM 123databasename321.`vehiculo` ;",[],callback);
}

//  Validar Actualizar Vehiculo
module.exports.GetColumnsNames = async (callback)=>{
    await query("SHOW COLUMNS FROM 123databasename321.`vehiculo` ;",[],callback);
}

var removechar=(str,pos)=>{ return ( pos >= str.length || pos < 0 || str.length == 0)? (str): (pos == 0)? (str.slice(1)): (pos == str.length -1 )? (str.slice(0,pos)) :(str.slice(0,pos)+str.slice(pos+1)) }
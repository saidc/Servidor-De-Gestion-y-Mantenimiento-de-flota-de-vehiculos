// CRUD VEHICULO
var query = (query_str,input,callback)=>{
    throw new Error("La variable de query no ha sido definida");
};
module.exports.addQuery = (que)=>{
    query = que;
}
// CREATE VEHICULO
module.exports.CrearVehiculo = async(ALIAS, PLACA, MARCA, LINEA, MODELO, CILINDRADA_CC, COLOR, SERVICIO, CLASE_DE_VEHICULO, TIPO_DE_CARROCERIA, COMBUSTIBLE, CAPACIDAD_KG_PSJ, NUMERO_DE_MOTOR, VIN, NUMERO_DE_SERIE, NUMERO_DE_CHASIS, PROPIETARIO, NIT, POTENCIA, DECLARACION_DE_IMPORTACION, FECHA_DE_IMPORTACION, PUERTAS, FECHA_MATRICULA, FECHA_EXP_LIC_TTO, callback)=>{
    await query("INSERT INTO `123databasename321`.`vehiculo` (`ALIAS`, `PLACA`, `MARCA`, `LINEA`, `MODELO`, `CILINDRADA CC`, `COLOR`, `SERVICIO`, `CLASE DE VEHICULO`, `TIPO DE CARROCERIA`, `COMBUSTIBLE`, `CAPACIDAD-KG-PSJ`, `NUMERO DE MOTOR`, `VIN`, `NUMERO DE SERIE`, `NUMERO DE CHASIS`, `PROPIETARIO`, `NIT`, `POTENCIA`, `DECLARACION DE IMPORTACION`, `FECHA DE IMPORTACION`, `PUERTAS`, `FECHA MATRICULA`, `FECHA EXP LIC TTO`) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?);",[ALIAS, PLACA, MARCA, LINEA, MODELO, CILINDRADA_CC, COLOR, SERVICIO, CLASE_DE_VEHICULO, TIPO_DE_CARROCERIA, COMBUSTIBLE, CAPACIDAD_KG_PSJ, NUMERO_DE_MOTOR, VIN, NUMERO_DE_SERIE, NUMERO_DE_CHASIS, PROPIETARIO, NIT, POTENCIA, DECLARACION_DE_IMPORTACION, FECHA_DE_IMPORTACION, PUERTAS, FECHA_MATRICULA, FECHA_EXP_LIC_TTO], callback);
}
// READ VEHICULO
module.exports.getVehiculobyId = async(ID , callback)=>{
    await query("SELECT * FROM 123databasename321.vehiculo WHERE (`id`= ? );",[ID],callback);
}
module.exports.getVehiculobyPlaca = async(Placa , callback)=>{
    await query("SELECT * FROM 123databasename321.vehiculo WHERE (PLACA = UPPER(?));",[Placa],callback);
}
module.exports.getVehiculosPosNoRows = async ( PosicionFila ,NoFilas,callback)=>{
    await query("SELECT PLACA,MARCA,MODELO,LINEA,COLOR,COMBUSTIBLE FROM 123databasename321.vehiculo LIMIT ?,?;",[PosicionFila,NoFilas],callback);
}
// obtienen el numero de vehiculos existentes
module.exports.getNumberOfVehiculos = async ( callback)=>{
    await query("SELECT COUNT(*) as NumRow FROM 123databasename321.vehiculo ;",[],callback);
}
// UPDATE VEHICULO
module.exports.ActualizarVehiculo = async(ID,ALIAS, PLACA, MARCA, LINEA, MODELO, CILINDRADA_CC, COLOR, SERVICIO, CLASE_DE_VEHICULO, TIPO_DE_CARROCERIA, COMBUSTIBLE, CAPACIDAD_KG_PSJ, NUMERO_DE_MOTOR, VIN, NUMERO_DE_SERIE, NUMERO_DE_CHASIS, PROPIETARIO, NIT, POTENCIA, DECLARACION_DE_IMPORTACION, FECHA_DE_IMPORTACION, PUERTAS, FECHA_MATRICULA, FECHA_EXP_LIC_TTO, callback)=>{
    var variables = [];
    var querystr = "UPDATE `123databasename321`.`vehiculo` SET ";
    if( ALIAS != null){ variables.push(ALIAS);    querystr += "`ALIAS`=?,";}
    if( PLACA != null){ variables.push(PLACA);    querystr += "`PLACA`=?,";}
    if( MARCA != null){ variables.push(MARCA);    querystr += "`MARCA`=?,";}
    if( LINEA != null){ variables.push(LINEA);    querystr += "`LINEA`=?," ;}
    if( MODELO != null){ variables.push(MODELO);  querystr += "`MODELO`=?,";}
    if( CILINDRADA_CC != null){ variables.push(CILINDRADA_CC);  querystr += "`CILINDRADA_CC`=?,";}
    if( COLOR != null){ variables.push(COLOR);                  querystr += "`COLOR`=?,";}
    if( SERVICIO != null){ variables.push(SERVICIO);            querystr += "`SERVICIO`=?," ;}
    if( CLASE_DE_VEHICULO != null){ variables.push(CLASE_DE_VEHICULO);      querystr += "`CLASE_DE_VEHICULO`=?,";}
    if( TIPO_DE_CARROCERIA != null){ variables.push(TIPO_DE_CARROCERIA);    querystr += "`TIPO_DE_CARROCERIA`=?,";}
    if( COMBUSTIBLE != null){ variables.push(COMBUSTIBLE);            querystr += "`COMBUSTIBLE`=?,";}
    if( CAPACIDAD_KG_PSJ != null){ variables.push(CAPACIDAD_KG_PSJ);  querystr += "`CAPACIDAD_KG_PSJ`=?," ;}
    if( NUMERO_DE_MOTOR != null){ variables.push(NUMERO_DE_MOTOR);    querystr += "`NUMERO_DE_MOTOR`=?,";}
    if( VIN != null){ variables.push(VIN);  querystr += "`VIN`=?,";}
    if( NUMERO_DE_SERIE != null){ variables.push(NUMERO_DE_SERIE);    querystr += "`NUMERO_DE_SERIE`=?,";}
    if( NUMERO_DE_CHASIS != null){ variables.push(NUMERO_DE_CHASIS);  querystr += "`NUMERO_DE_CHASIS`=?," ;}
    if( PROPIETARIO != null){ variables.push(PROPIETARIO);  querystr += "`PROPIETARIO`=?,";}
    if( NIT != null){ variables.push(NIT);  querystr += "`NIT`=?,";}
    if( POTENCIA != null){ variables.push(POTENCIA);  querystr += "`POTENCIA`=?,";}
    if( DECLARACION_DE_IMPORTACION != null){ variables.push(DECLARACION_DE_IMPORTACION);  querystr += "`DECLARACION_DE_IMPORTACION`=?," ;}
    if( FECHA_DE_IMPORTACION != null){ variables.push(FECHA_DE_IMPORTACION);  querystr += "`FECHA_DE_IMPORTACION`=?,";}
    if( PUERTAS != null){ variables.push(PUERTAS);  querystr += "`PUERTAS`=?,";}
    if( FECHA_MATRICULA != null){ variables.push(FECHA_MATRICULA);  querystr += "`FECHA_MATRICULA`=?,";}
    if( FECHA_EXP_LIC_TTO != null){ variables.push(FECHA_EXP_LIC_TTO);  querystr += "`FECHA_EXP_LIC_TTO`=?" ;}
    variables.push(ID);
    querystr += " WHERE (`id` = ?);";
    await query(querystr,variables,callback);
}

// DELETE VEHICULO
module.exports.EliminarVehiculo = async(ID,callback)=>{
    await query("DELETE FROM `123databasename321`.`vehiculo` WHERE (`id` = ?);",[ID],callback);
}

// get Placa
module.exports.getID_Vehiculo = async(PLACA,callback)=>{
    await query("SELECT id FROM 123databasename321.vehiculo WHERE (PLACA = ? );",[PLACA],callback);
}

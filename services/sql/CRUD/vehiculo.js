// CRUD VEHICULO
var conexion = null;
module.exports.addConexion = (con)=>{
    conexion = con;
} 
// CREATE VEHICULO
module.exports.CrearVehiculo = (ALIAS, PLACA, MARCA, LINEA, MODELO, CILINDRADA_CC, COLOR, SERVICIO, CLASE_DE_VEHICULO, TIPO_DE_CARROCERIA, COMBUSTIBLE, CAPACIDAD_KG_PSJ, NUMERO_DE_MOTOR, VIN, NUMERO_DE_SERIE, NUMERO_DE_CHASIS, PROPIETARIO, NIT, POTENCIA, DECLARACION_DE_IMPORTACION, FECHA_DE_IMPORTACION, PUERTAS, FECHA_MATRICULA, FECHA_EXP_LIC_TTO, callback)=>{
    if(conexion == null){ 
        throw new Error("La variable de Conexion no ha sido definida");
    }else{
        conexion.query("INSERT INTO `heroku_d887aadfd8b0128`.`vehiculo` (`ALIAS`, `PLACA`, `MARCA`, `LINEA`, `MODELO`, `CILINDRADA CC`, `COLOR`, `SERVICIO`, `CLASE DE VEHICULO`, `TIPO DE CARROCERIA`, `COMBUSTIBLE`, `CAPACIDAD-KG-PSJ`, `NUMERO DE MOTOR`, `VIN`, `NUMERO DE SERIE`, `NUMERO DE CHASIS`, `PROPIETARIO`, `NIT`, `POTENCIA`, `DECLARACION DE IMPORTACION`, `FECHA DE IMPORTACION`, `PUERTAS`, `FECHA MATRICULA`, `FECHA EXP LIC TTO`) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?);",[ALIAS, PLACA, MARCA, LINEA, MODELO, CILINDRADA_CC, COLOR, SERVICIO, CLASE_DE_VEHICULO, TIPO_DE_CARROCERIA, COMBUSTIBLE, CAPACIDAD_KG_PSJ, NUMERO_DE_MOTOR, VIN, NUMERO_DE_SERIE, NUMERO_DE_CHASIS, PROPIETARIO, NIT, POTENCIA, DECLARACION_DE_IMPORTACION, FECHA_DE_IMPORTACION, PUERTAS, FECHA_MATRICULA, FECHA_EXP_LIC_TTO], callback);
    }
}
// READ VEHICULO
module.exports.LeerVehiculo = (ID , callback)=>{
    if(conexion == null){ 
        throw new Error("La variable de Conexion no ha sido definida");
    }else{
        conexion.query("SELECT * FROM heroku_d887aadfd8b0128.vehiculo WHERE (`id`= ? );",[ID],callback);
    }
}

// UPDATE VEHICULO
module.exports.ActualizarVehiculo = (ID,ALIAS, PLACA, MARCA, LINEA, MODELO, CILINDRADA_CC, COLOR, SERVICIO, CLASE_DE_VEHICULO, TIPO_DE_CARROCERIA, COMBUSTIBLE, CAPACIDAD_KG_PSJ, NUMERO_DE_MOTOR, VIN, NUMERO_DE_SERIE, NUMERO_DE_CHASIS, PROPIETARIO, NIT, POTENCIA, DECLARACION_DE_IMPORTACION, FECHA_DE_IMPORTACION, PUERTAS, FECHA_MATRICULA, FECHA_EXP_LIC_TTO, callback)=>{
    if(conexion == null){
        throw new Error("La variable de Conexion no ha sido definida");
    }else{
        var variables = [];
        var query = "UPDATE `heroku_d887aadfd8b0128`.`vehiculo` SET ";
        if( ALIAS != null){ variables.push(ALIAS);  query += "`ALIAS`=?,";}
        if( PLACA != null){ variables.push(PLACA);  query += "`PLACA`=?,";}
        if( MARCA != null){ variables.push(MARCA);  query += "`MARCA`=?,";}
        if( LINEA != null){ variables.push(LINEA);  query += "`LINEA`=?," ;}
        if( MODELO != null){ variables.push(MODELO);  query += "`MODELO`=?,";}
        if( CILINDRADA_CC != null){ variables.push(CILINDRADA_CC);  query += "`CILINDRADA_CC`=?,";}
        if( COLOR != null){ variables.push(COLOR);  query += "`COLOR`=?,";}
        if( SERVICIO != null){ variables.push(SERVICIO);  query += "`SERVICIO`=?," ;}
        if( CLASE_DE_VEHICULO != null){ variables.push(CLASE_DE_VEHICULO);  query += "`CLASE_DE_VEHICULO`=?,";}
        if( TIPO_DE_CARROCERIA != null){ variables.push(TIPO_DE_CARROCERIA);  query += "`TIPO_DE_CARROCERIA`=?,";}
        if( COMBUSTIBLE != null){ variables.push(COMBUSTIBLE);  query += "`COMBUSTIBLE`=?,";}
        if( CAPACIDAD_KG_PSJ != null){ variables.push(CAPACIDAD_KG_PSJ);  query += "`CAPACIDAD_KG_PSJ`=?," ;}
        if( NUMERO_DE_MOTOR != null){ variables.push(NUMERO_DE_MOTOR);  query += "`NUMERO_DE_MOTOR`=?,";}
        if( VIN != null){ variables.push(VIN);  query += "`VIN`=?,";}
        if( NUMERO_DE_SERIE != null){ variables.push(NUMERO_DE_SERIE);  query += "`NUMERO_DE_SERIE`=?,";}
        if( NUMERO_DE_CHASIS != null){ variables.push(NUMERO_DE_CHASIS);  query += "`NUMERO_DE_CHASIS`=?," ;}
        if( PROPIETARIO != null){ variables.push(PROPIETARIO);  query += "`PROPIETARIO`=?,";}
        if( NIT != null){ variables.push(NIT);  query += "`NIT`=?,";}
        if( POTENCIA != null){ variables.push(POTENCIA);  query += "`POTENCIA`=?,";}
        if( DECLARACION_DE_IMPORTACION != null){ variables.push(DECLARACION_DE_IMPORTACION);  query += "`DECLARACION_DE_IMPORTACION`=?," ;}
        if( FECHA_DE_IMPORTACION != null){ variables.push(FECHA_DE_IMPORTACION);  query += "`FECHA_DE_IMPORTACION`=?,";}
        if( PUERTAS != null){ variables.push(PUERTAS);  query += "`PUERTAS`=?,";}
        if( FECHA_MATRICULA != null){ variables.push(FECHA_MATRICULA);  query += "`FECHA_MATRICULA`=?,";}
        if( FECHA_EXP_LIC_TTO != null){ variables.push(FECHA_EXP_LIC_TTO);  query += "`FECHA_EXP_LIC_TTO`=?" ;}
        variables.push(ID);
        query += " WHERE (`id` = ?);";
        conexion.query(query,variables,callback);
    }
}

// DELETE VEHICULO
module.exports.EliminarVehiculo = (ID,callback)=>{
    if(conexion == null){ 
        throw new Error("La variable de Conexion no ha sido definida");
    }else{
        conexion.query("DELETE FROM `heroku_d887aadfd8b0128`.`vehiculo` WHERE (`id` = ?);",[ID],callback);
    }
}
// get Placa
module.exports.getID_Vehiculo = (PLACA,callback)=>{
    if(conexion == null){ 
        throw new Error("La variable de Conexion no ha sido definida");
    }else{
        conexion.query("SELECT id FROM heroku_d887aadfd8b0128.vehiculo WHERE (PLACA = ? );",[PLACA],callback);
    }
}
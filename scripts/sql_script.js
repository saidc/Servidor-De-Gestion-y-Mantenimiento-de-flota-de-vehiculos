const {usuario,vehiculo,reporte,usuario_vehiculo,alert} = require("../services/sql/index.js");

var bcrypt = require('bcryptjs'); // para generar hash de las contraseñas que se guardaran en la Base de datos 

var CrearVehiculo = async(ALIAS, PLACA, MARCA, LINEA, MODELO, CILINDRADA_CC, COLOR, SERVICIO, CLASE_DE_VEHICULO, TIPO_DE_CARROCERIA, COMBUSTIBLE, CAPACIDAD_KG_PSJ, NUMERO_DE_MOTOR, VIN, NUMERO_DE_SERIE, NUMERO_DE_CHASIS, PROPIETARIO, NIT, POTENCIA, DECLARACION_DE_IMPORTACION, FECHA_DE_IMPORTACION, PUERTAS, FECHA_MATRICULA, FECHA_EXP_LIC_TTO)=>{
    vehiculo.CrearVehiculo(ALIAS, PLACA, MARCA, LINEA, MODELO, CILINDRADA_CC, COLOR, SERVICIO, CLASE_DE_VEHICULO, TIPO_DE_CARROCERIA, COMBUSTIBLE, CAPACIDAD_KG_PSJ, NUMERO_DE_MOTOR, VIN, NUMERO_DE_SERIE, NUMERO_DE_CHASIS, PROPIETARIO, NIT, POTENCIA, DECLARACION_DE_IMPORTACION, FECHA_DE_IMPORTACION, PUERTAS, FECHA_MATRICULA, FECHA_EXP_LIC_TTO,(error, results, fields)=>{
        if(error){
            throw error;
        }
        console.log(results ); 
    });
};

var CrearUsuario = async(email, password, rol, cedula)=>{
    const hashedPsw = await bcrypt.hash(password, 12);
    console.log("password:",hashedPsw);
    usuario.CrearUsuario(email,hashedPsw,rol,cedula,(error, results, fields)=>{
        if(error){
            throw error;
        }
        console.log(results);
    });
}
/*
vehiculo.getVehiculosPosNoRows(0,10,(error, results, fields)=>{
    if(!error){
        console.log(results);
    }else{
        console.log(error);
    }
});
*/

vehiculo.getNumberOfVehiculos((error, results, fields)=>{
    if(!error){
        var numRows = results[0]["NumRow"]; 
        vehiculo.getVehiculosPosNoRows(0,10,(error, results, fields)=>{
            if(!error){
                console.log(numRows,results);
            }else{
                console.log(error);
            }
        });
    }else{
        console.log(error);
    }
});
/*
vehiculo.GetColumnsNames((error, results, fields)=>{
    if(!error){
        //console.log(results);
        l = []
        results.forEach((item, index)=>{
            l.push(item["Field"])
        });
        console.log(l);
    }else{
        console.log(error);
    }
});
*/
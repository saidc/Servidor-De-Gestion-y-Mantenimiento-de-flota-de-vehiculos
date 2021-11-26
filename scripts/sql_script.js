const {user,vehiculo,reporte,usuario_vehiculo,alert} = require("../services/sql/index.js");

var bcrypt = require('bcryptjs'); // para generar hash de las contraseñas que se guardaran en la Base de datos 
/*
reporte.LeerReporte(1,(error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results);
});
*/
/*
{
    "table_name": "report", 
    "id": 1150073, 
    "PLACA": "FWW722"
    "FECHA": "21-11-18 15:19:02", 
    "GRUPO": null, 
    "BATERIA": null, 
    "LATITUD": "10.495770012974535", 
    "LONGITUD": "-73.26421998702547", 
    "SPEED": "84.80480961564261", 
    "RPM": "4000", 
    "DISTANCE_W_MIL": null, 
    "DISTANCE_SINCE_DTC_CLEAR": null, 
    "ALERTA": "sobre revolucionado", 
}
 */

/*
reporte.CrearReporte("FWW722", "21-11-18 15:19:02", null, null, "10.495770012974535", "-73.26421998702547", "84.80480961564261", "4000", null, null, "sobre revolucionado",(error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results);
});
*/
/*
usuario_vehiculo.GetUsuario_byPlaca("FWW725",(error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results);
});
*/
/*
alert.LeerAlerta((error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results);
});
*/
/*
alert.CrearAlerta( 'encendido', 'el vehiculo a sido encendido sin autorizacion , en latitud: 1234 , longitud:1234', 'elm327', 'media' , (error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results);
});
*/
/*
vehiculo.getID_Vehiculo("FWW722",(error, results, fields)=>{
    if(error){
        throw error;
    }
    if(results.constructor.name == "Array"){
        console.log(results.length > 0);
        console.log(results[0]);

    }
});
*/
var CrearVehiculo = async(ALIAS, PLACA, MARCA, LINEA, MODELO, CILINDRADA_CC, COLOR, SERVICIO, CLASE_DE_VEHICULO, TIPO_DE_CARROCERIA, COMBUSTIBLE, CAPACIDAD_KG_PSJ, NUMERO_DE_MOTOR, VIN, NUMERO_DE_SERIE, NUMERO_DE_CHASIS, PROPIETARIO, NIT, POTENCIA, DECLARACION_DE_IMPORTACION, FECHA_DE_IMPORTACION, PUERTAS, FECHA_MATRICULA, FECHA_EXP_LIC_TTO)=>{
    vehiculo.CrearVehiculo(ALIAS, PLACA, MARCA, LINEA, MODELO, CILINDRADA_CC, COLOR, SERVICIO, CLASE_DE_VEHICULO, TIPO_DE_CARROCERIA, COMBUSTIBLE, CAPACIDAD_KG_PSJ, NUMERO_DE_MOTOR, VIN, NUMERO_DE_SERIE, NUMERO_DE_CHASIS, PROPIETARIO, NIT, POTENCIA, DECLARACION_DE_IMPORTACION, FECHA_DE_IMPORTACION, PUERTAS, FECHA_MATRICULA, FECHA_EXP_LIC_TTO,(error, results, fields)=>{
        if(error){
            throw error;
        }
        console.log(results ); 
    });
};
            // ALIAS, PLACA, MARCA, LINEA, MODELO, CILINDRADA_CC, COLOR, SERVICIO, CLASE_DE_VEHICULO, TIPO_DE_CARROCERIA, COMBUSTIBLE, CAPACIDAD_KG_PSJ, NUMERO_DE_MOTOR, VIN, NUMERO_DE_SERIE, NUMERO_DE_CHASIS, PROPIETARIO, NIT, POTENCIA, DECLARACION_DE_IMPORTACION, FECHA_DE_IMPORTACION, PUERTAS, FECHA_MATRICULA, FECHA_EXP_LIC_TTO
//CrearVehiculo( "FWW722" , "FWW722" ,"TOYOTA","HILUX","2019","2393","SUPER BLANCO","PARTICULAR","CAMIONETA","DOBLE CABINA","DIESEL","5","2GD-4597034","8AJKB8CD9K1679620","8AJKB8CD9K1679620","8AJKB8CD9K1679620","BANCOLOMBIA S.A","890903938","148","482019000185440","13/03/2019","4","01/04/2019","02/04/2019");
//CrearVehiculo( "FWW725" , "FWW725" ,"TOYOTA","HILUX","2019","2393","SUPER BLANCO","PARTICULAR","CAMIONETA","DOBLE CABINA","DIESEL","5","2GD-4598642","8AJKB8CD9K1679651","SAJKB8CD9K1679651","8AJKB8CD9K1679651","BANCOLOMBIA S.A","890903938","148","482019000185440","13/03/2019","4","01/04/2019","02/04/2019");
//CrearVehiculo( "FWW723" , "FWW723" ,"TOYOTA","HILUX","2019","2393","SUPER BLANCO","PARTICULAR","CAMIONETA","DOBLE CABINA","DIESEL","5","2GD-4597359","8AJKB8CD0K1679635","8AJKB8CD0K1679635","8AJKB8CD0K1679635","BANCOLOMBIA S.A","890903938","148","482019000185440","13/03/2019","4","01/04/2019","02/04/2019");

/*
vehiculo.getVehiculobyPlaca("qhy948",(error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results); 
});
vehiculo.getVehiculos((error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results); 
});
vehiculo.getNumberOfVehiculos((error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results); 
});
vehiculo.getVehiculosPosNoRows(0,10,(error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results); 
});

*/
var CrearUsuario = async(email, password, rol, cedula)=>{
    const hashedPsw = await bcrypt.hash(password, 12);
    console.log("password:",hashedPsw);
    user.CrearUsuario(email,hashedPsw,rol,cedula,(error, results, fields)=>{
        if(error){
            throw error;
        }
        console.log(results);
    });
}
//CrearUsuario("jolecorcar@gmail.com","abcd1234","trabajador","77016463");
//CrearUsuario("saidjoc@gmail.com","abcd1234","administrador","1140873219");

/*
user.LeerUsuario(65,(error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results); 
});
user.getUsuariosPosNoRows(0,15,(error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results); 
});
user.getNumberOfUsuarios((error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results[0].NumRow); 
});
*/
user.GetUser_by_USUARIO("saidjoc@gmail.com",(error, results, fields)=>{
    if(error){
        throw error;
    }
    console.log(results); 
});

const {usuario,vehiculo,reporte,usuario_vehiculo,alert,tipodevehiculo,rutinademantenimiento} = require("../../services/sql/index.js");
var bcrypt = require('bcryptjs');
var Usuarios_id = "Usuarios";
var Vehiculos_id = "Vehiculos";
var Tiposdevehiculos_id = "Tiposdevehiculos";
var RutinasDeMantenimiento_id = "RutinasDeMantenimiento";
var PlaneacionesDeMantenimiento_id = "PlaneacionesDeMantenimiento";
var Alertas_id = "Alertas";
var VEHICULO_USUARIO_id = "VEHICULO_USUARIO";

var dataLabels = {
    Usuarios: ["NOMBRE", "APELLIDO", "GENERO", "TARJETA", "ROL", "CORREO", "CEDULA", "PASSWORD"],
    Vehiculos: ["ALIAS", "PLACA", "id_tipodevehiculo", "CILINDRADA CC", "COLOR", "SERVICIO", "CLASE DE VEHICULO", "TIPO DE CARROCERIA", "COMBUSTIBLE", "CAPACIDAD_KG_PSJ", "NUMERO DE MOTOR", "VIN", "NUMERO DE SERIE", "NUMERO DE CHASIS", "PROPIETARIO", "NIT", "POTENCIA", "DECLARACION DE IMPORTACION", "FECHA DE IMPORTACION", "PUERTAS", "FECHA MATRICULA", "FECHA EXP LIC TTO"],
    Tiposdevehiculos: ["MARCA", "LINEA", "MODELO"],
    RutinasDeMantenimiento: ["TIEMPO","MEDICION_DE_TIEMPO","DISTANCIA","MEDICION_DE_DISTANCIA","DESCRIPCION","ESTADO_DE_RUTINA","TIPO_DE_RUTINA","PLACA_DE_VEHICULO","id_tipodevehiculo","TITULO","OPERACION"],
    PlaneacionesDeMantenimiento: ["PLACA_DE_VEHICULO", "id_rutinademantenimiento", "FECHAINICIAL", "FECHAFINAL", "ESTADO_DE_PLAN", "OBSERVACION"], 
    Alertas: ["PLACA_DE_VEHICULO", "FECHA", "TIPODEALERTA", "PRIORIDAD", "DESCRIPCION"],   
    IOTReport: ["PLACA_DE_VEHICULO","FECHA", "USER", "POSICION", "SPEED", "RPM", "ESTADO_DE_VEHICULO"],
    IOTFilterItem: ["Initial Date Time", "Final Date Time", "Status"],
    VEHICULO_USUARIO: ["PLACA_DE_VEHICULO", "CORREO_DE_USUARIO"],
}

var dataVariables = {
    Usuarios: ["NOMBRE", "APELLIDO", "GENERO", "TARJETA", "ROL", "CORREO", "CEDULA", "PASSWORD"],
    Vehiculos: ['ALIAS', 'PLACA', 'id_tipodevehiculo', 'CILINDRADA CC','COLOR','SERVICIO','CLASE DE VEHICULO', 'TIPO DE CARROCERIA','COMBUSTIBLE','CAPACIDAD_KG_PSJ','NUMERO DE MOTOR','VIN','NUMERO DE SERIE','NUMERO DE CHASIS','PROPIETARIO','NIT','POTENCIA','DECLARACION DE IMPORTACION', 'FECHA DE IMPORTACION','PUERTAS','FECHA MATRICULA','FECHA EXP LIC TTO'],
    Tiposdevehiculos: ["MARCA", "LINEA", "MODELO"],
    RutinasDeMantenimiento: ["TIEMPO","MEDICION_DE_TIEMPO","DISTANCIA","MEDICION_DE_DISTANCIA","DESCRIPCION","ESTADO_DE_RUTINA","TIPO_DE_RUTINA","PLACA_DE_VEHICULO","id_tipodevehiculo","TITULO","OPERACION"],
    PlaneacionesDeMantenimiento: ["PLACA_DE_VEHICULO", "id_rutinademantenimiento", "FECHAINICIAL", "FECHAFINAL", "ESTADO_DE_PLAN", "OBSERVACION"], 
    Alertas: ["PLACA_DE_VEHICULO", "FECHA", "TIPODEALERTA", "PRIORIDAD", "DESCRIPCION"], 
    IOTReport: ["PLACA_DE_VEHICULO","FECHA", "USER", "POSICION", "SPEED", "RPM", "ESTADO_DE_VEHICULO"],
    IOTFilterItem: ["InitialDateTime", "FinalDateTime", "Status"],
    VEHICULO_USUARIO: ["PLACA_DE_VEHICULO", "CORREO_DE_USUARIO"],
}

var sideItems = [
    {content: "Usuarios"  , id: Usuarios_id},
    {content: "Vehiculos" , id: Vehiculos_id},
    {content: "Tipos de vehiculos", id: Tiposdevehiculos_id},
    {content: "Rutinas De Mantenimiento", id: RutinasDeMantenimiento_id},
    {content: "Planeaciones de Mantenimiento", id: PlaneacionesDeMantenimiento_id},
    {content: "Alertas", id: Alertas_id},
    {content: "Vehiculo - Usuario", id: VEHICULO_USUARIO_id},
];

var RutinasDeMantenimiento = [
    {id: 1, PLACA_DE_VEHICULO: "User1" , id_tipodevehiculo: "awef", ESTADO_DE_RUTINA: "male", TIPO_DE_RUTINA: "PREVENTIVO", TIEMPO: "1" , MEDICION_DE_TIEMPO: "random 1", DISTANCIA: "123", MEDICION_DE_DISTANCIA: "345", TITULO: "345", OPERACION: "345", DESCRIPCION: "345"},
    {id: 2, PLACA_DE_VEHICULO: "User2" , id_tipodevehiculo: "wefw", ESTADO_DE_RUTINA: "male", TIPO_DE_RUTINA: "CORRECTIVO", TIEMPO: "2" , MEDICION_DE_TIEMPO: "random 2", DISTANCIA: "132", MEDICION_DE_DISTANCIA: "3t3", TITULO: "345", OPERACION: "345", DESCRIPCION: "345"},
    {id: 3, PLACA_DE_VEHICULO: "User3" , id_tipodevehiculo: "fwee", ESTADO_DE_RUTINA: "male", TIPO_DE_RUTINA: "PREVENTIVO", TIEMPO: "3" , MEDICION_DE_TIEMPO: "random 3", DISTANCIA: "321", MEDICION_DE_DISTANCIA: "tg5", TITULO: "345", OPERACION: "345", DESCRIPCION: "345"},
    {id: 4, PLACA_DE_VEHICULO: "User4" , id_tipodevehiculo: "fwee", ESTADO_DE_RUTINA: "male", TIPO_DE_RUTINA: "CORRECTIVO", TIEMPO: "6" , MEDICION_DE_TIEMPO: "random 3", DISTANCIA: "321", MEDICION_DE_DISTANCIA: "dfh", TITULO: "345", OPERACION: "345", DESCRIPCION: "345"},
    {id: 5, PLACA_DE_VEHICULO: "User5" , id_tipodevehiculo: "fwee", ESTADO_DE_RUTINA: "male", TIPO_DE_RUTINA: "PREVENTIVO", TIEMPO: "2" , MEDICION_DE_TIEMPO: "random 3", DISTANCIA: "321", MEDICION_DE_DISTANCIA: "tg5", TITULO: "345", OPERACION: "345", DESCRIPCION: "345"},
    {id: 6, PLACA_DE_VEHICULO: "User6" , id_tipodevehiculo: "fwee", ESTADO_DE_RUTINA: "male", TIPO_DE_RUTINA: "CORRECTIVO", TIEMPO: "8" , MEDICION_DE_TIEMPO: "random 3", DISTANCIA: "uim", MEDICION_DE_DISTANCIA: "rbt", TITULO: "345", OPERACION: "345", DESCRIPCION: "345"},
];
var PlaneacionesDeMantenimiento = [
    {id: 1, PLACA_DE_VEHICULO: "Vehiculo1" , id_rutinademantenimiento: "awef", FECHAINICIAL: "male", FECHAFINAL: "1" , ESTADO_DE_PLAN: "EXITOSO"  , OBSERVACION: "123"},
    {id: 2, PLACA_DE_VEHICULO: "Vehiculo2" , id_rutinademantenimiento: "wefw", FECHAINICIAL: "male", FECHAFINAL: "2" , ESTADO_DE_PLAN: "ESPERA"   , OBSERVACION: "132"},
    {id: 3, PLACA_DE_VEHICULO: "Vehiculo3" , id_rutinademantenimiento: "fwee", FECHAINICIAL: "fema", FECHAFINAL: "3" , ESTADO_DE_PLAN: "CANCELADO", OBSERVACION: "321"},
    {id: 4, PLACA_DE_VEHICULO: "Vehiculo4" , id_rutinademantenimiento: "fwee", FECHAINICIAL: "male", FECHAFINAL: "6" , ESTADO_DE_PLAN: "EXITOSO"  , OBSERVACION: "321"},
    {id: 5, PLACA_DE_VEHICULO: "Vehiculo5" , id_rutinademantenimiento: "fwee", FECHAINICIAL: "feme", FECHAFINAL: "2" , ESTADO_DE_PLAN: "ESPERA"   , OBSERVACION: "321"},
    {id: 6, PLACA_DE_VEHICULO: "Vehiculo6" , id_rutinademantenimiento: "fwee", FECHAINICIAL: "male", FECHAFINAL: "8" , ESTADO_DE_PLAN: "CANCELADO", OBSERVACION: "uim"},
];
var Alertas = [
    {id: 1, PLACA_DE_VEHICULO: "Vehiculo1" , FECHA: "awef", TIPODEALERTA: "male", PRIORIDAD: "1" , DESCRIPCION: "random 1"},
    {id: 2, PLACA_DE_VEHICULO: "Vehiculo2" , FECHA: "wefw", TIPODEALERTA: "male", PRIORIDAD: "2" , DESCRIPCION: "random 2"},
    {id: 3, PLACA_DE_VEHICULO: "Vehiculo3" , FECHA: "fwee", TIPODEALERTA: "fele", PRIORIDAD: "3" , DESCRIPCION: "random 3"},
    {id: 4, PLACA_DE_VEHICULO: "Vehiculo4" , FECHA: "fwee", TIPODEALERTA: "mope", PRIORIDAD: "6" , DESCRIPCION: "random 3"},
    {id: 5, PLACA_DE_VEHICULO: "Vehiculo5" , FECHA: "fwee", TIPODEALERTA: "fale", PRIORIDAD: "2" , DESCRIPCION: "random 3"},
    {id: 6, PLACA_DE_VEHICULO: "Vehiculo6" , FECHA: "fwee", TIPODEALERTA: "male", PRIORIDAD: "8" , DESCRIPCION: "random 3"},
];
var IOTReports = [
    {id: 1, PLACA_DE_VEHICULO: "Vehiculo1", FECHA: "2021-11-24" , USER: "awef", POSICION: "{lat:,lon:}", SPEED: "1" , RPM: "111", ESTADO_DE_VEHICULO: "Stopped"  },
    {id: 2, PLACA_DE_VEHICULO: "Vehiculo1", FECHA: "2021-10-24" , USER: "wefw", POSICION: "{lat:,lon:}", SPEED: "2" , RPM: "111", ESTADO_DE_VEHICULO: "Moving"   },
    {id: 3, PLACA_DE_VEHICULO: "Vehiculo1", FECHA: "2021-4-24"  , USER: "fwee", POSICION: "{lat:,lon:}", SPEED: "3" , RPM: "111", ESTADO_DE_VEHICULO: "Moving"   },
    {id: 4, PLACA_DE_VEHICULO: "Vehiculo1", FECHA: "2021-8-24"  , USER: "fwee", POSICION: "{lat:,lon:}", SPEED: "6" , RPM: "111", ESTADO_DE_VEHICULO: "Turn on"  },
    {id: 5, PLACA_DE_VEHICULO: "Vehiculo2", FECHA: "2021-5-24"  , USER: "fwee", POSICION: "{lat:,lon:}", SPEED: "2" , RPM: "111", ESTADO_DE_VEHICULO: "Stopped"  },
    {id: 6, PLACA_DE_VEHICULO: "Vehiculo2", FECHA: "2021-10-24" , USER: "fwee", POSICION: "{lat:,lon:}", SPEED: "8" , RPM: "111", ESTADO_DE_VEHICULO: "Turn off" },
];
var VEHICULO_USUARIO = [
    {id: 1, PLACA_DE_VEHICULO: "Vehiculo1", CORREO_DE_USUARIO: "awef1@CORREO" },
    {id: 2, PLACA_DE_VEHICULO: "Vehiculo2", CORREO_DE_USUARIO: "wefw2@CORREO" },
    {id: 3, PLACA_DE_VEHICULO: "Vehiculo3", CORREO_DE_USUARIO: "fwee3@CORREO" },
    {id: 4, PLACA_DE_VEHICULO: "Vehiculo4", CORREO_DE_USUARIO: "fwee4@CORREO" },
    {id: 5, PLACA_DE_VEHICULO: "Vehiculo5", CORREO_DE_USUARIO: "fwee5@CORREO" },
    {id: 6, PLACA_DE_VEHICULO: "Vehiculo6", CORREO_DE_USUARIO: "fwee6@CORREO" },
];

var getDataTypes = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    return res.status(200).json({error:false,login:login, dataLabels: dataLabels, dataVariables: dataVariables});
}
var getSidebarItems = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    return res.status(200).json({error: false, login:login, res: sideItems});
}
var gettipodevehiculosbyId = async(req,res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    id = req.body.id
    console.log(id)
    tipodevehiculo.gettipodevehiculosbyId(id,(error, results, fields)=>{
        if(!error){
            console.log(results)
            return res.status(200).json({error: false, login:login, result: results});
        }else{
            console.log(error)
            return res.status(200).json({error: true, login:login, result: []});
        }
    });
};
var getVEHICULO_BY_PLACA_DE_VEHICULO = async(req,res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    placa = req.body.placa
    console.log(id)
    vehiculo.getVehiculobyPlaca(placa,(error, results, fields)=>{
        if(!error){
            console.log(results)
            return res.status(200).json({error: false, login:login, result: results});
        }else{
            console.log(error)
            return res.status(200).json({error: true, login:login, result: []});
        }
    });
};

var updateoptionsforselect = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    id = req.body.id
    if(id == "Vehiculos"){
        tipodevehiculo.gettiposdevehiculos((error, results, fields)=>{
            if(!error){ 
                id_tipodevehiculo = []
                results.forEach((item, index)=>{
                    id_tipodevehiculo.push(item["id"])
                }); 
                return res.status(200).json({error:false,login:login, optionForSelect: {id_tipodevehiculo: id_tipodevehiculo }});
            }else{
                console.log(error)
                return res.status(200).json({error:true,login:login, optionForSelect: results });
            }
        });
    }else if(id == "RutinasDeMantenimiento"){
        console.log("buscara en placa de vehiculo y tiposde vehiculos")
        // PLACA_DE_VEHICULO  id_tipodevehiculo
        tipodevehiculo.gettiposdevehiculos((error, results, fields)=>{
            if(!error){
                id_tipodevehiculo = []
                results.forEach((item, index)=>{
                    id_tipodevehiculo.push(item["id"])
                });
                vehiculo.getVehiculo((error, results2, fields)=>{
                    if(!error){
                        placa_de_vehiculo = []
                        results2.forEach((item, index)=>{
                            placa_de_vehiculo.push(item["PLACA"])
                        });
                        return res.status(200).json({error:false,login:login, optionForSelect: {id_tipodevehiculo: id_tipodevehiculo, PLACA_DE_VEHICULO : placa_de_vehiculo}});
                    }else{
                        console.log("error de vehiculo",error)
                        return res.status(200).json({error:true,login:login, optionForSelect: {id_tipodevehiculo: id_tipodevehiculo }});
                    }
                });
            }else{
                console.log("error de tipodevehiculo ",error)
                return res.status(200).json({error:true,login:login, optionForSelect: {} });
            }
        });
    }else{
        return res.status(200).json({error:false,login:login, optionForSelect: [] });
    }
}

var getUsuarios = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    const {PosicionFila ,NoFilas, json} = req.body;
    var msg = {
        name: Usuarios_id,
        num: 0, 
        res: []
    };
    usuario.getNumberOfUsuarios((error, results, fields)=>{
        if(!error){
            var numRows = results[0]["NumRow"]; 
            usuario.getUsuariosPosNoRows(0,10,(error, results, fields)=>{
                if(!error){
                    // quitar los verdaderos passwords
                    results.forEach((item, index)=>{
                        if(item.hasOwnProperty('PASSWORD')){
                            item['PASSWORD'] = "******"
                        }
                    });
                    msg["num"] = numRows
                    msg["res"] = results

                    return res.status(200).json({error:false, login:login, res:msg});
                }else{
                    return res.status(200).json({error:true, login:login, res:msg});
                }
            });
        }else{
            return res.status(200).json({error:true, login:login, res:msg});
        }
    });
}


var getVehiculos = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    const {PosicionFila ,NoFilas,json} = req.body;
    
    var msg = {
        name:Vehiculos_id,
        num:0, 
        res:[],
        report:IOTReports,
    };

    vehiculo.getNumberOfVehiculos((error, results, fields)=>{
        if(!error){
            var numRows = results[0]["NumRow"]; 
            vehiculo.getVehiculosPosNoRows(0,10,(error, results, fields)=>{
                if(!error){
                
                    msg["num"] = numRows
                    msg["res"] = results
    
                    return res.status(200).json({error:false, login:login, res:msg});
                }else{
                    return res.status(200).json({error:true, login:login, res:msg});
                }
            });
        }else{
            return res.status(200).json({error:true, login:login, res:msg});
        }
    });
}

var getTiposdevehiculos = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    var msg = {
        name:Tiposdevehiculos_id,
        num:0, 
        res:[]
    };
    tipodevehiculo.getNumberOftipodevehiculo((error, results, fields)=>{
        if(!error){
            var numRows = results[0]["NumRow"]; 
            tipodevehiculo.gettiposdevehiculosPosNoRows(0,10,(error, results, fields)=>{
                if(!error){
                
                    msg["num"] = numRows
                    msg["res"] = results
    
                    return res.status(200).json({error:false, login:login, res:msg});
                }else{
                    return res.status(200).json({error:true, login:login, res:msg});
                }
            });
        }else{
            return res.status(200).json({error:true, login:login, res:msg});
        }
    });
}

var getRutinasDeMantenimiento = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    var msg = {
        name:RutinasDeMantenimiento_id,
        num:0, 
        res:[]
    };
    rutinademantenimiento.getNumberOfrutinademantenimiento((error, results, fields)=>{
        if(!error){
            var numRows = results[0]["NumRow"]; 
            rutinademantenimiento.getrutinademantenimientoPosNoRows(0,10,(error, results, fields)=>{
                if(!error){
                
                    msg["num"] = numRows
                    msg["res"] = results
    
                    return res.status(200).json({error:false, login:login, res:msg});
                }else{
                    return res.status(200).json({error:true, login:login, res:msg});
                }
            });
        }else{
            return res.status(200).json({error:true, login:login, res:msg});
        }
    });
}

var getPlaneacionesDeMantenimiento = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    var msg = {
        name:PlaneacionesDeMantenimiento_id,
        num:PlaneacionesDeMantenimiento.length, 
        res:PlaneacionesDeMantenimiento
    };
    return res.status(200).json({error:false, login:login, res:msg});
}
var getAlertas = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    var msg = {
        name:Alertas_id,
        num:Alertas.length, 
        res:Alertas
    };
    return res.status(200).json({error:false, login:login, res:msg});
}
var getVEHICULO_USUARIO = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    var msg = {
        name:VEHICULO_USUARIO_id,
        num:VEHICULO_USUARIO.length, 
        res:VEHICULO_USUARIO
    };
    return res.status(200).json({error:false, login:login, res:msg});
}
// update functions
var writeUsuarios = async (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var id;
    var order;
    console.log(data)
    if(data["id"] != "") {
        // Actualizar USUARIO
        id = data["id"];
        pass = (data["PASSWORD"] == "******")? null :  await bcrypt.hash(data["PASSWORD"], 12) ;
        usuario.ActualizarUsuario(data["id"], data["NOMBRE"], data["APELLIDO"], data["CORREO"], pass, data["ROL"], data["GENERO"], data["CEDULA"], data["TARJETA"], (error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                return res.status(200).json({success: false, login:login, result: []}); 
            }
        });
    }else {
        // Crear USUARIO
        pass = (data["PASSWORD"] == "******")? null :  await bcrypt.hash(data["PASSWORD"], 12) ;
        usuario.CrearUsuario(data["NOMBRE"], data["APELLIDO"], data["CORREO"], pass, data["ROL"], data["GENERO"], data["CEDULA"], data["TARJETA"],(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                console.log(error)
                return res.status(200).json({success: false, login:login, result: []}); 
            }
        });
    }
}
//     'ALIAS', 'PLACA', 'id_tipodevehiculo', 'CILINDRADA CC','COLOR','SERVICIO','CLASE DE VEHICULO', 'TIPO DE CARROCERIA','COMBUSTIBLE','CAPACIDAD_KG_PSJ','NUMERO DE MOTOR','VIN','NUMERO DE SERIE','NUMERO DE CHASIS','PROPIETARIO','NIT','POTENCIA','DECLARACION DE IMPORTACION','FECHA DE IMPORTACION','PUERTAS','FECHA MATRICULA','FECHA EXP LIC TTO'

var writeVehiculos = async (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var id;
    console.log(data)
    if(data["id"] != "") {
        // Actualizar Vehiculo
        id = data["id"]; 
        vehiculo.ActualizarVehiculo(id,data['ALIAS'],data['PLACA'],data['id_tipodevehiculo'],data['CILINDRADA CC'],data['COLOR'],data['SERVICIO'],data['CLASE DE VEHICULO'],data['TIPO DE CARROCERIA'],data['COMBUSTIBLE'],data['CAPACIDAD_KG_PSJ'],data['NUMERO DE MOTOR'],data['VIN'],data['NUMERO DE SERIE'],data['NUMERO DE CHASIS'],data['PROPIETARIO'],data['NIT'],data['POTENCIA'],data['DECLARACION DE IMPORTACION'],data['FECHA DE IMPORTACION'],data['PUERTAS'],data['FECHA MATRICULA'],data['FECHA EXP LIC TTO'], (error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                console.log(error)
                return res.status(200).json({success: false, login:login, result: []}); 
            }
        });
    }else {
        vehiculo.CrearVehiculo( data['ALIAS'],data['PLACA'],data['id_tipodevehiculo'],data['CILINDRADA CC'],data['COLOR'],data['SERVICIO'],data['CLASE DE VEHICULO'],data['TIPO DE CARROCERIA'],data['COMBUSTIBLE'],data['CAPACIDAD_KG_PSJ'],data['NUMERO DE MOTOR'],data['VIN'],data['NUMERO DE SERIE'],data['NUMERO DE CHASIS'],data['PROPIETARIO'],data['NIT'],data['POTENCIA'],data['DECLARACION DE IMPORTACION'],data['FECHA DE IMPORTACION'],data['PUERTAS'],data['FECHA MATRICULA'],data['FECHA EXP LIC TTO'] ,(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                console.log(error)
                return res.status(200).json({success: false, login:login, result: []}); 
            }
        });
    }
}

var writeTiposdevehiculos = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var id;
    if(data["id"] != "") {
        id = data["id"];
        tipodevehiculo.Actualizartipodevehiculo(id,data['MARCA'],data['LINEA'],data['MODELO'],(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                console.log(error)
                return res.status(200).json({success: false, login:login, result: []}); 
            }
        });
    }else {
        tipodevehiculo.Creartipodevehiculo( data['MARCA'],data['LINEA'],data['MODELO'],(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                console.log(error)
                return res.status(200).json({success: false, login:login, result: []}); 
            }
        });
    }
}

var writeRutinasDeMantenimiento = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var id;
    if(data["id"] != "") {
        id = data["id"];
        rutinademantenimiento.Actualizarrutinademantenimiento(id,data["TIEMPO"],data["MEDICION_DE_TIEMPO"],data["DISTANCIA"],data["MEDICION_DE_DISTANCIA"],data["DESCRIPCION"],data["ESTADO_DE_RUTINA"],data["TIPO_DE_RUTINA"],data["PLACA_DE_VEHICULO"],data["id_tipodevehiculo"],data["TITULO"],data["OPERACION"],(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                console.log(error)
                return res.status(200).json({success: false, login:login, result: []}); 
            }
        });
    }else {
        rutinademantenimiento.Crearrutinademantenimiento( data["TIEMPO"],data["MEDICION_DE_TIEMPO"],data["DISTANCIA"],data["MEDICION_DE_DISTANCIA"],data["DESCRIPCION"],data["ESTADO_DE_RUTINA"],data["TIPO_DE_RUTINA"],data["PLACA_DE_VEHICULO"],data["id_tipodevehiculo"],data["TITULO"],data["OPERACION"],(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                console.log(error)
                return res.status(200).json({success: false, login:login, result: []}); 
            }
        });
    }
}

var writePlaneacionesDeMantenimiento = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var id;
    var order;
    if(data["id"] != "") {
        id = data["id"];
        PlaneacionesDeMantenimiento.forEach((item, index) => {
            if(item["id"] == data["id"]) order = index;
        });
        PlaneacionesDeMantenimiento.splice(order, 1, data);
    }else {
        id = PlaneacionesDeMantenimiento[PlaneacionesDeMantenimiento.length - 1]["id"] + 1;
        data["id"] = id;
        PlaneacionesDeMantenimiento.push(data);
    }
    return res.status(200).json({success: true, login:login, result: PlaneacionesDeMantenimiento});
}
var writeAlertas = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var id;
    var order;
    if(data["id"] != "") {
        id = data["id"];
        Alertas.forEach((item, index) => {
            if(item["id"] == data["id"]) order = index;
        });
        Alertas.splice(order, 1, data);
    }else {
        id = Alertas[Alertas.length - 1]["id"] + 1;
        data["id"] = id;
        Alertas.push(data);
    }
    return res.status(200).json({success: true, login:login, result: Alertas});
}
var writeVEHICULO_USUARIO = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var id;
    var order;
    if(data["id"] != "") {
        id = data["id"];
        VEHICULO_USUARIO.forEach((item, index) => {
            if(item["id"] == data["id"]) order = index;
        });
        VEHICULO_USUARIO.splice(order, 1, data);
    }else {
        id = VEHICULO_USUARIO[VEHICULO_USUARIO.length - 1]["id"] + 1;
        data["id"] = id;
        VEHICULO_USUARIO.push(data);
    }
    return res.status(200).json({success: true, login:login, result: VEHICULO_USUARIO});
}
// delete functions
var deleteUsuarios = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["id"]) {
        id = data["id"];
        usuario.EliminarUsuario(id,(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                return res.status(200).json({success: false, login:login, result: []});
            }
        });
    }else {
        return res.status(200).json({success: false, login:login, result: []});
    }
}

var deleteVehiculos = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["id"]) {
        id = data["id"];
        vehiculo.EliminarVehiculo(id,(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                return res.status(200).json({success: false, login:login, result: []});
            }
        });
    }else {
        return res.status(200).json({success: false, login:login, result: []});
    }
}

var deleteTiposdevehiculos = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["id"]) {
        id = data["id"];
        tipodevehiculo.Eliminartipodevehiculos(id,(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                return res.status(200).json({success: false, login:login, result: []});
            }
        });
    }else {
        return res.status(200).json({success: false, login:login, result: []});
    }
}

var deleteRutinasDeMantenimiento = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["id"]) {
        id = data["id"];
        rutinademantenimiento.Eliminarrutinademantenimiento(id,(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                return res.status(200).json({success: false, login:login, result: []});
            }
        });
        //RutinasDeMantenimiento.forEach((item, index) => {
        //    if(item["id"] == data["id"]) order = index;
        //});
        //RutinasDeMantenimiento.splice(order, 1);
        //return res.status(200).json({success: true, login:login, result: RutinasDeMantenimiento});
    }else {
        return res.status(200).json({success: false, login:login, result: RutinasDeMantenimiento});
    }
}

var deletePlaneacionesDeMantenimiento = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["id"]) {
        id = data["id"];
        PlaneacionesDeMantenimiento.forEach((item, index) => {
            if(item["id"] == data["id"]) order = index;
        });
        PlaneacionesDeMantenimiento.splice(order, 1);
        return res.status(200).json({success: true, login:login, result: PlaneacionesDeMantenimiento});
    }else {
        return res.status(200).json({success: false, login:login, result: PlaneacionesDeMantenimiento});
    }
}

var deleteAlertas = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["id"]) {
        id = data["id"];
        Alertas.forEach((item, index) => {
            if(item["id"] == data["id"]) order = index;
        });
        Alertas.splice(order, 1);
        return res.status(200).json({success: true, login:login, result: Alertas});
    }else {
        return res.status(200).json({success: false, login:login, result: Alertas});
    }
}
var deleteVEHICULO_USUARIO = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["id"]) {
        id = data["id"];
        VEHICULO_USUARIO.forEach((item, index) => {
            if(item["id"] == data["id"]) order = index;
        });
        VEHICULO_USUARIO.splice(order, 1);
        return res.status(200).json({success: true, login:login, result: VEHICULO_USUARIO});
    }else {
        return res.status(200).json({success: false, login:login, result: VEHICULO_USUARIO});
    }
}

module.exports  = {
    getDataTypes,
    getSidebarItems,
    updateoptionsforselect,
    gettipodevehiculosbyId,
    getVEHICULO_BY_PLACA_DE_VEHICULO,

    getUsuarios,
    getVehiculos,
    getTiposdevehiculos,
    getRutinasDeMantenimiento,
    getPlaneacionesDeMantenimiento,
    getAlertas,
    getVEHICULO_USUARIO,

    writeUsuarios,
    writeVehiculos,
    writeTiposdevehiculos,
    writeRutinasDeMantenimiento,
    writePlaneacionesDeMantenimiento,
    writeAlertas,
    writeVEHICULO_USUARIO,

    deleteUsuarios,
    deleteVehiculos,
    deleteTiposdevehiculos,
    deleteRutinasDeMantenimiento,
    deletePlaneacionesDeMantenimiento,
    deleteAlertas,
    deleteVEHICULO_USUARIO
}

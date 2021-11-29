const {usuario,vehiculo,reporte,usuario_vehiculo,alert,tipodevehiculo,rutinademantenimiento,plandemantenimiento} = require("../../services/sql/index.js");
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
    RutinasDeMantenimiento: ["TITULO","OPERACION_DE_MANTENIMIENTO","TIEMPO","MEDICION_DE_TIEMPO","DISTANCIA","MEDICION_DE_DISTANCIA","DESCRIPCION","ESTADO_DE_RUTINA","TIPO_DE_RUTINA","PLACA_DE_VEHICULO","id_tipodevehiculo"],
    PlaneacionesDeMantenimiento: ["PLACA_DE_VEHICULO","id_rutinademantenimiento","FECHAINICIAL","FECHAFINAL","ESTADO_DE_PLAN","OBSERVACION"], 
    Alertas: ["PLACA_DE_VEHICULO", "FECHA", "TIPODEALERTA", "PRIORIDAD", "DESCRIPCION"],   
    IOTReport: ["PLACA_DE_VEHICULO","FECHA", "USER", "LATITUD","LONGITUD", "SPEED", "RPM", "ESTADO_DE_VEHICULO"],
    IOTFilterItem: ["FECHA Y HORA INICIAL", "FECHA Y HORA FINAL", "ESTADO_DE_VEHICULO"],
    VEHICULO_USUARIO: ["PLACA_DE_VEHICULO", "CORREO_DE_USUARIO"],
}

var dataVariables = {
    Usuarios: ["NOMBRE", "APELLIDO", "GENERO", "TARJETA", "ROL", "CORREO", "CEDULA", "PASSWORD"],
    Vehiculos: ['ALIAS', 'PLACA', 'id_tipodevehiculo', 'CILINDRADA CC','COLOR','SERVICIO','CLASE DE VEHICULO', 'TIPO DE CARROCERIA','COMBUSTIBLE','CAPACIDAD_KG_PSJ','NUMERO DE MOTOR','VIN','NUMERO DE SERIE','NUMERO DE CHASIS','PROPIETARIO','NIT','POTENCIA','DECLARACION DE IMPORTACION', 'FECHA DE IMPORTACION','PUERTAS','FECHA MATRICULA','FECHA EXP LIC TTO'],
    Tiposdevehiculos: ["MARCA", "LINEA", "MODELO"],
    RutinasDeMantenimiento: ["TITULO","OPERACION_DE_MANTENIMIENTO","TIEMPO","MEDICION_DE_TIEMPO","DISTANCIA","MEDICION_DE_DISTANCIA","DESCRIPCION","ESTADO_DE_RUTINA","TIPO_DE_RUTINA","PLACA_DE_VEHICULO","id_tipodevehiculo"],
    PlaneacionesDeMantenimiento: ["PLACA_DE_VEHICULO","id_rutinademantenimiento","FECHAINICIAL","FECHAFINAL","ESTADO_DE_PLAN","OBSERVACION"], 
    Alertas: ["PLACA_DE_VEHICULO", "FECHA", "TIPODEALERTA", "PRIORIDAD", "DESCRIPCION"], 
    IOTReport: ["PLACA_DE_VEHICULO","FECHA", "USER", "LATITUD", "LONGITUD", "SPEED", "RPM", "ESTADO_DE_VEHICULO"],
    IOTFilterItem: ["FECHAINICIAL", "FECHAFINAL", "ESTADO_DE_VEHICULO"],
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
var getreporte = async(req,res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    var placa = req.body.id;
    //console.log("placa",placa)
    reporte.getReporte_by_placa(placa,(error, results, fields)=>{
        if(!error){
            //console.log(results)
            return res.status(200).json({error: false, login:login, result: results});
        }else{
            console.log(error)
            return res.status(200).json({error: true, login:login, result: []});
        }
    });
};
var getreportefiltro = async(req,res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    console.log("filterdata:",data)
    reporte.getReporte_by_estado_fecha_hora(data["PLACA_DE_VEHICULO"],data["ESTADO_DE_VEHICULO"], data["FECHAINICIAL"], data["FECHAFINAL"],(error, results, fields)=>{
        if(!error){
            console.log("filterresult:",results)
            return res.status(200).json({error: false, login:login, result: results});
        }else{
            console.log(error)
            return res.status(200).json({error: true, login:login, result: []});
        }
    });
};

var getRutinademantenimientobyid = async(req,res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    id = req.body.id
    console.log("id",id)
    rutinademantenimiento.getrutinademantenimientobyId(id,(error, results, fields)=>{
        if(!error){
            console.log("results",results)
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
var getUSUARIO_BY_CORREO = async(req,res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    correo = req.body.correo
    usuario.GetUser_by_USUARIO(correo,(error, results, fields)=>{
        if(!error){
            results.forEach((item, index)=>{
                if(item.hasOwnProperty('PASSWORD')){
                    item['PASSWORD'] = "******"
                }
            });
            return res.status(200).json({error: false, login:login, result: results});
        }else{
            console.log(error)
            return res.status(200).json({error: true, login:login, result: []});
        }
    });
};

var actualizaroptionsforselect = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    id = req.body.id
    
    if(id == "Vehiculos"){
        console.log("se cargara la lista de seleccion de Vehiculos")
        tipodevehiculo.gettiposdevehiculos((error, results, fields)=>{
            if(!error){ 
                id_tipodevehiculo = []
                results.forEach((item, index)=>{
                    id_tipodevehiculo.push({value:item["id"],name: item["MARCA"]+"-"+item["LINEA"]+"-"+item["MODELO"]})
                }); 
                return res.status(200).json({error:false,login:login, optionForSelect: {id_tipodevehiculo: id_tipodevehiculo }});
            }else{
                console.log(error)
                return res.status(200).json({error:true,login:login, optionForSelect: results });
            }
        });
    }else if(id == "RutinasDeMantenimiento"){
        console.log("se cargara la lista de seleccion de RutinasDeMantenimiento")
        // PLACA_DE_VEHICULO  id_tipodevehiculo
        tipodevehiculo.gettiposdevehiculos((error, results, fields)=>{
            if(!error){
                id_tipodevehiculo = []
                id_tipodevehiculo.push("")
                results.forEach((item, index)=>{
                    id_tipodevehiculo.push({value:item["id"],name:item["MARCA"]+"-"+item["LINEA"]+"-"+item["MODELO"]})
                });
                vehiculo.getVehiculo((error, results2, fields)=>{
                    if(!error){
                        placa_de_vehiculo = []
                        placa_de_vehiculo.push("")
                        results2.forEach((item, index)=>{
                            placa_de_vehiculo.push({value:item["PLACA"],name:item["PLACA"]})
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
    }else if(id == "PlaneacionesDeMantenimiento"){
        // PLACA_DE_VEHICULO id_rutinademantenimiento
        console.log("se cargara la lista de seleccion de PlaneacionesDeMantenimiento")
        vehiculo.getVehiculo((error, results, fields)=>{
            if(!error){
                placa_de_vehiculo = []
                results.forEach((item, index)=>{
                    placa_de_vehiculo.push({value:item["PLACA"],name:item["PLACA"]})
                });
                rutinademantenimiento.getrutinademantenimiento((error, results2, fields)=>{
                    id_rutinasdemantenimiento = []
                    id_rutinasdemantenimiento.push("");
                    results2.forEach((item, index)=>{
                        id_rutinasdemantenimiento.push({value:item["id"],name:item["TITULO"]});
                    });
                    if(!error){
                        return res.status(200).json({error:false,login:login, optionForSelect: {PLACA_DE_VEHICULO : placa_de_vehiculo, id_rutinademantenimiento: id_rutinasdemantenimiento}});
                    }else{
                        return res.status(200).json({error:false,login:login, optionForSelect: {PLACA_DE_VEHICULO : placa_de_vehiculo}});
                    }
                });
            }else{
                console.log("error de vehiculo",error)
                return res.status(200).json({error:true,login:login, optionForSelect: { }});
            }
        });
    }else if(id == "VEHICULO_USUARIO"){
        // PLACA_DE_VEHICULO    CORREO_DE_USUARIO
        console.log("se cargara la lista de seleccion de VEHICULO_USUARIO")
        vehiculo.getVehiculo((error, results, fields)=>{
            if(!error){
                placa_de_vehiculo = []
                results.forEach((item, index)=>{
                    placa_de_vehiculo.push({value:item["PLACA"],name:item["PLACA"]})
                });
                usuario.getUsuarios((error, results2, fields)=>{
                    correo_de_usuario = []
                    results2.forEach((item, index)=>{
                        correo_de_usuario.push({value:item["CORREO"],name:item["CORREO"]});
                    });
                    if(!error){
                        return res.status(200).json({error:false,login:login, optionForSelect: {PLACA_DE_VEHICULO : placa_de_vehiculo, CORREO_DE_USUARIO: correo_de_usuario}});
                    }else{
                        return res.status(200).json({error:false,login:login, optionForSelect: {PLACA_DE_VEHICULO : placa_de_vehiculo}});
                    }
                });
            }else{
                console.log("error de vehiculo",error)
                return res.status(200).json({error:true,login:login, optionForSelect: { }});
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
        num:0, 
        res:[]
    };
    plandemantenimiento.getNumberOfplandemantenimiento((error, results, fields)=>{
        if(!error){
            var numRows = results[0]["NumRow"]; 
            plandemantenimiento.getplandemantenimientoPosNoRows(0,10,(error, results, fields)=>{
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

var getAlertas = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    var msg = {
        name:Alertas_id,
        num:0, 
        res:[]
    };
    alert.getNumberOfAlertas((error, results, fields)=>{
        if(!error){
            var numRows = results[0]["NumRow"]; 
            alert.getalertaPosNoRows(0,10,(error, results2, fields)=>{
                if(!error){
                    msg["num"] = numRows
                    msg["res"] = results2
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
var getVEHICULO_USUARIO = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    var msg = {
        name:VEHICULO_USUARIO_id,
        num:0, 
        res:[]
    };
    usuario_vehiculo.getNumberOfusuario_vehiculo((error, results, fields)=>{
        if(!error){
            var numRows = results[0]["NumRow"]; 
            usuario_vehiculo.getusuario_vehiculoPosNoRows(0,10,(error, results2, fields)=>{
                if(!error){
                    msg["num"] = numRows
                    msg["res"] = results2
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
// actualizar functions
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
        rutinademantenimiento.Actualizarrutinademantenimiento(id,data["TIEMPO"],data["MEDICION_DE_TIEMPO"],data["DISTANCIA"],data["MEDICION_DE_DISTANCIA"],data["DESCRIPCION"],data["ESTADO_DE_RUTINA"],data["TIPO_DE_RUTINA"],data["PLACA_DE_VEHICULO"],data["id_tipodevehiculo"],data["TITULO"],data["OPERACION_DE_MANTENIMIENTO"],(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                console.log(error)
                return res.status(200).json({success: false, login:login, result: []}); 
            }
        });
    }else {
        rutinademantenimiento.Crearrutinademantenimiento( data["TIEMPO"],data["MEDICION_DE_TIEMPO"],data["DISTANCIA"],data["MEDICION_DE_DISTANCIA"],data["DESCRIPCION"],data["ESTADO_DE_RUTINA"],data["TIPO_DE_RUTINA"],data["PLACA_DE_VEHICULO"],data["id_tipodevehiculo"],data["TITULO"],data["OPERACION_DE_MANTENIMIENTO"],(error, results, fields)=>{
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
        plandemantenimiento.Actualizarplandemantenimiento(id, data["PLACA_DE_VEHICULO"],data["id_rutinademantenimiento"],data["FECHAINICIAL"],data["FECHAFINAL"],data["ESTADO_DE_PLAN"],data["OBSERVACION"],(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                console.log(error)
                return res.status(200).json({success: false, login:login, result: []}); 
            }
        });
    }else {
        plandemantenimiento.Crearplandemantenimiento( data["PLACA_DE_VEHICULO"],data["id_rutinademantenimiento"],data["FECHAINICIAL"],data["FECHAFINAL"],data["ESTADO_DE_PLAN"],data["OBSERVACION"] ,(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                console.log(error)
                return res.status(200).json({success: false, login:login, result: []}); 
            }
        });
    }
}
/*
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
*/

var writeVEHICULO_USUARIO = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var id;
    var order;
    if(data["id"] != "") {
        id = data["id"];
        usuario_vehiculo.Actualizarusuario_vehiculo(id, data["PLACA_DE_VEHICULO"],data["CORREO_DE_USUARIO"],(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                console.log(error)
                return res.status(200).json({success: false, login:login, result: []}); 
            }
        });
    }else {
        usuario_vehiculo.Crearusuario_vehiculo(  data["PLACA_DE_VEHICULO"],data["CORREO_DE_USUARIO"],(error, results, fields)=>{
            if(!error){
                return res.status(200).json({success: true, login:login, result: []});
            }else{
                console.log(error)
                return res.status(200).json({success: false, login:login, result: []}); 
            }
        });
    }
}

// eliminar functions
var eliminarUsuarios = (req, res) => {
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

var eliminarVehiculos = (req, res) => {
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

var eliminarTiposdevehiculos = (req, res) => {
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

var eliminarRutinasDeMantenimiento = (req, res) => {
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
    }else {
        return res.status(200).json({success: false, login:login, result: []});
    }
}

var eliminarPlaneacionesDeMantenimiento = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["id"]) {
        id = data["id"];
        plandemantenimiento.Eliminarplandemantenimiento(id,(error, results, fields)=>{
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

var eliminarAlertas = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["id"]) {
        id = data["id"];
        alert.Eliminaralerta(id,(error, results, fields)=>{
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

var eliminarVEHICULO_USUARIO = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["id"]) {
        id = data["id"];
        usuario_vehiculo.Eliminusuario_vehiculo(id,(error, results, fields)=>{
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

module.exports  = {
    getDataTypes,
    getSidebarItems,
    actualizaroptionsforselect,
    getRutinademantenimientobyid,
    gettipodevehiculosbyId,
    getVEHICULO_BY_PLACA_DE_VEHICULO,
    getUSUARIO_BY_CORREO,

    getUsuarios,
    getVehiculos,
    getTiposdevehiculos,
    getRutinasDeMantenimiento,
    getPlaneacionesDeMantenimiento,
    getAlertas,
    getVEHICULO_USUARIO,
    getreporte,
    getreportefiltro,

    writeUsuarios,
    writeVehiculos,
    writeTiposdevehiculos,
    writeRutinasDeMantenimiento,
    writePlaneacionesDeMantenimiento,
    //writeAlertas,
    writeVEHICULO_USUARIO,

    eliminarUsuarios,
    eliminarVehiculos,
    eliminarTiposdevehiculos,
    eliminarRutinasDeMantenimiento,
    eliminarPlaneacionesDeMantenimiento,
    eliminarAlertas,
    eliminarVEHICULO_USUARIO
}

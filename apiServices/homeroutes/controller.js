const {user,vehiculo} = require("../../services/sql/index.js");

var Users_id = "Users";
var Vehicles_id = "Vehicles";
var VehicleTypes_id = "VehicleTypes";
var MaintainanceRoutine_id = "MaintainanceRoutine";
var MaintainancePlanning_id = "MaintainancePlanning";
var Alerts_id = "Alerts";

var dataLabels = {
    Users: ["Name", "Last Name", "Gender", "Id Card", "Role", "Email", "Password"],
    Vehicles: ["Alias", "Plaque", "Vehicle Id", "Cilindrada cc", "Color", "Service", "Calse de Vehiculo", "Tipo de Carroceria", "Combustible", "Capacidad-kg-psj", "Numero de motor", "Vin", "Numero de Serie", "Numero de Chasis", "Propietario", "NIT", "Potencia", "Declaracion de importacion", "Fecha de importacion", "Puertas", "Fecha Matricula", "Fecha Exp Lic TTO"],
    VehicleTypes: ["MARCA", "LINEA", "MODELO"],
    MaintainanceRoutine: ["Vehiculo", "Tipo de vehiculo", "Estado", "Type", "Tiempo", "Medicion Time", "Distancia", "Medicion Dist", "Titulo", "Operacion", "Description"],
    IOTReport: ["Date", "User", "Position", "Speed", "RPM", "Status"],
    IOTFilterItem: ["Initial Date Time", "Final Date Time", "Status"],
    MaintainancePlanning: ["Vehiculo", "Maintein Routin", "Initial Date", "Final Date", "State", "OBSERVATION"], 
    Alerts: ["Vehiculo", "Date", "Type", "ID", "Details"],   
}
var dataVariables = {
    Users: ["Name", "LastName", "Gender", "IdCard", "Role", "Email", "Password"],
    Vehicles: ["Alias", "Plaque", "VehicleTypeId", "Cilindrada", "Color", "Service", "Calse", "TipoCarroceria", "Combustible", "Capacidad", "motorNum", "Vin", "SerieNum", "ChasisNum", "Propietario", "NIT", "Potencia", "importacionDeclaracion", "importacionFecha", "Puertas", "FechaMatricula", "FechaExp"],
    VehicleTypes: ["MARCA", "LINEA", "MODELO"],
    MaintainanceRoutine: ["VehiculoName", "VehicleTypeId", "Estado", "Type", "Tiempo", "MedicionTime", "Distancia", "MedicionDist", "Titulo", "Operacion", "Description"],
    IOTReport: ["Date", "User", "Position", "Speed", "RPM", "Status"],
    IOTFilterItem: ["InitialDateTime", "FinalDateTime", "Status"],
    MaintainancePlanning: ["VehiculoName", "MainteinRoutin", "InitialDate", "FinalDate", "State", "OBSERVATION"], 
    Alerts: ["VehiculoName", "Date", "Type", "ID", "Details"], 
}

var sideItems = [
    {content: "Users"  , id: Users_id},
    {content: "Vehicles" , id: Vehicles_id},
    {content: "VehicleTypes", id: VehicleTypes_id},
    {content: "Maintainance Routine", id: MaintainanceRoutine_id},
    {content: "Maintainance Planning", id: MaintainancePlanning_id},
    {content: "Alerts", id: Alerts_id},
];

var users = [
    {Id: 1, Name: "User1" , LastName: "awef", Gender: "male", Email: "1" , Role: "random 1", IdCard: "123", Password: "345"},
    {Id: 2, Name: "User2" , LastName: "wefw", Gender: "male", Email: "2" , Role: "random 2", IdCard: "132", Password: "3t3"},
    {Id: 3, Name: "User3" , LastName: "fwee", Gender: "female", Email: "3" , Role: "random 3", IdCard: "321", Password: "tg5"},
    {Id: 4, Name: "User4" , LastName: "fwee", Gender: "male", Email: "6" , Role: "random 3", IdCard: "321", Password: "dfh"},
    {Id: 5, Name: "User5" , LastName: "fwee", Gender: "female", Email: "2" , Role: "random 3", IdCard: "321", Password: "tg5"},
    {Id: 6, Name: "User6" , LastName: "fwee", Gender: "male", Email: "8" , Role: "random 3", IdCard: "uim", Password: "rbt"},
    {Id: 7, Name: "User7" , LastName: "cortes", Gender: "male", Email: "saidc@gmail.com" , Role: "Admin", IdCard: "uim", Password: "alskdjflakjsfd"},
];
var vehicles = [
    {Id: 1, Alias: "User1" , Plaque: "awef", VehicleTypeId: "sfew", Cilindrada: "male", Color: "1" , Service: "random 1", Calse: "123", TipoCarroceria: "345", Combustible: "345", Capacidad: "345", motorNum: "345", Vin: "345", SerieNum: "345", ChasisNum: "345", Propietario: "345", NIT: "345", Potencia: "345", importacionDeclaracion: "345", importacionFecha: "345", Puertas: "345", FechaMatricula: "345", FechaExp: "345"},
    {Id: 2, Alias: "User2" , Plaque: "wefw", VehicleTypeId: "awef", Cilindrada: "male", Color: "2" , Service: "random 2", Calse: "132", TipoCarroceria: "3t3", Combustible: "345", Capacidad: "345", motorNum: "345", Vin: "345", SerieNum: "345", ChasisNum: "345", Propietario: "345", NIT: "345", Potencia: "345", importacionDeclaracion: "345", importacionFecha: "345", Puertas: "345", FechaMatricula: "345", FechaExp: "345"},
    {Id: 3, Alias: "User3" , Plaque: "fwee", VehicleTypeId: "efew", Cilindrada: "fema", Color: "3" , Service: "random 3", Calse: "321", TipoCarroceria: "tg5", Combustible: "345", Capacidad: "345", motorNum: "345", Vin: "345", SerieNum: "345", ChasisNum: "345", Propietario: "345", NIT: "345", Potencia: "345", importacionDeclaracion: "345", importacionFecha: "345", Puertas: "345", FechaMatricula: "345", FechaExp: "345"},
    {Id: 4, Alias: "User4" , Plaque: "fwee", VehicleTypeId: "awef", Cilindrada: "male", Color: "6" , Service: "random 3", Calse: "321", TipoCarroceria: "dfh", Combustible: "345", Capacidad: "345", motorNum: "345", Vin: "345", SerieNum: "345", ChasisNum: "345", Propietario: "345", NIT: "345", Potencia: "345", importacionDeclaracion: "345", importacionFecha: "345", Puertas: "345", FechaMatricula: "345", FechaExp: "345"},
    {Id: 5, Alias: "User5" , Plaque: "fwee", VehicleTypeId: "gegr", Cilindrada: "fema", Color: "2" , Service: "random 3", Calse: "321", TipoCarroceria: "tg5", Combustible: "345", Capacidad: "345", motorNum: "345", Vin: "345", SerieNum: "345", ChasisNum: "345", Propietario: "345", NIT: "345", Potencia: "345", importacionDeclaracion: "345", importacionFecha: "345", Puertas: "345", FechaMatricula: "345", FechaExp: "345"},
    {Id: 6, Alias: "User6" , Plaque: "fwee", VehicleTypeId: "awef", Cilindrada: "male", Color: "8" , Service: "random 3", Calse: "uim", TipoCarroceria: "rbt", Combustible: "345", Capacidad: "345", motorNum: "345", Vin: "345", SerieNum: "345", ChasisNum: "345", Propietario: "345", NIT: "345", Potencia: "345", importacionDeclaracion: "345", importacionFecha: "345", Puertas: "345", FechaMatricula: "345", FechaExp: "345"},
];
var vehicleTypes = [
    {Id: 1, MARCA: "CarType1" , LINEA: "awef", MODELO: "model1" },
    {Id: 2, MARCA: "CarType2" , LINEA: "wefw", MODELO: "model2" },
    {Id: 3, MARCA: "CarType3" , LINEA: "fwee", MODELO: "model3" },
    {Id: 4, MARCA: "CarType4" , LINEA: "fwee", MODELO: "model4" },
    {Id: 5, MARCA: "CarType5" , LINEA: "fwee", MODELO: "model5" },
    {Id: 6, MARCA: "CarType6" , LINEA: "fwee", MODELO: "model6" },
]
var maintainanceRoutines = [
    {Id: 1, VehiculoName: "User1" , VehicleTypeId: "awef", Estado: "male", Type: "male", Tiempo: "1" , MedicionTime: "random 1", Distancia: "123", MedicionDist: "345", Titulo: "345", Operacion: "345", Description: "345"},
    {Id: 2, VehiculoName: "User2" , VehicleTypeId: "wefw", Estado: "male", Type: "male", Tiempo: "2" , MedicionTime: "random 2", Distancia: "132", MedicionDist: "3t3", Titulo: "345", Operacion: "345", Description: "345"},
    {Id: 3, VehiculoName: "User3" , VehicleTypeId: "fwee", Estado: "male", Type: "fele", Tiempo: "3" , MedicionTime: "random 3", Distancia: "321", MedicionDist: "tg5", Titulo: "345", Operacion: "345", Description: "345"},
    {Id: 4, VehiculoName: "User4" , VehicleTypeId: "fwee", Estado: "male", Type: "male", Tiempo: "6" , MedicionTime: "random 3", Distancia: "321", MedicionDist: "dfh", Titulo: "345", Operacion: "345", Description: "345"},
    {Id: 5, VehiculoName: "User5" , VehicleTypeId: "fwee", Estado: "male", Type: "feme", Tiempo: "2" , MedicionTime: "random 3", Distancia: "321", MedicionDist: "tg5", Titulo: "345", Operacion: "345", Description: "345"},
    {Id: 6, VehiculoName: "User6" , VehicleTypeId: "fwee", Estado: "male", Type: "male", Tiempo: "8" , MedicionTime: "random 3", Distancia: "uim", MedicionDist: "rbt", Titulo: "345", Operacion: "345", Description: "345"},
];
var maintainancePlannings = [
    {Id: 1, VehiculoName: "Vehiculo1" , MainteinRoutin: "awef", InitialDate: "male", FinalDate: "1" , State: "random 1", OBSERVATION: "123"},
    {Id: 2, VehiculoName: "Vehiculo2" , MainteinRoutin: "wefw", InitialDate: "male", FinalDate: "2" , State: "random 2", OBSERVATION: "132"},
    {Id: 3, VehiculoName: "Vehiculo3" , MainteinRoutin: "fwee", InitialDate: "fema", FinalDate: "3" , State: "random 3", OBSERVATION: "321"},
    {Id: 4, VehiculoName: "Vehiculo4" , MainteinRoutin: "fwee", InitialDate: "male", FinalDate: "6" , State: "random 3", OBSERVATION: "321"},
    {Id: 5, VehiculoName: "Vehiculo5" , MainteinRoutin: "fwee", InitialDate: "feme", FinalDate: "2" , State: "random 3", OBSERVATION: "321"},
    {Id: 6, VehiculoName: "Vehiculo6" , MainteinRoutin: "fwee", InitialDate: "male", FinalDate: "8" , State: "random 3", OBSERVATION: "uim"},
];
var alerts = [
    {Id: 1, VehiculoName: "Vehiculo1" , Date: "awef", Type: "male", ID: "1" , Details: "random 1"},
    {Id: 2, VehiculoName: "Vehiculo2" , Date: "wefw", Type: "male", ID: "2" , Details: "random 2"},
    {Id: 3, VehiculoName: "Vehiculo3" , Date: "fwee", Type: "fele", ID: "3" , Details: "random 3"},
    {Id: 4, VehiculoName: "Vehiculo4" , Date: "fwee", Type: "mope", ID: "6" , Details: "random 3"},
    {Id: 5, VehiculoName: "Vehiculo5" , Date: "fwee", Type: "fale", ID: "2" , Details: "random 3"},
    {Id: 6, VehiculoName: "Vehiculo6" , Date: "fwee", Type: "male", ID: "8" , Details: "random 3"},
];
var IOTReports = [
    {Id: 1, VehicleId: 1, Date: "2021-11-24" , User: "awef", Position: "male", Speed: "1" , RPM: "111", Status: "Stopped"},
    {Id: 2, VehicleId: 1, Date: "2021-10-24" , User: "wefw", Position: "male", Speed: "2" , RPM: "111", Status: "Moving"},
    {Id: 3, VehicleId: 1, Date: "2021-4-24" , User: "fwee", Position: "fele", Speed: "3" , RPM: "111", Status: "Moving"},
    {Id: 4, VehicleId: 1, Date: "2021-8-24" , User: "fwee", Position: "mope", Speed: "6" , RPM: "111", Status: "Turn on"},
    {Id: 5, VehicleId: 2, Date: "2021-5-24" , User: "fwee", Position: "fale", Speed: "2" , RPM: "111", Status: "Stopped"},
    {Id: 6, VehicleId: 2, Date: "2021-10-24" , User: "fwee", Position: "male", Speed: "8" , RPM: "111", Status: "Turn off"},
];

var getDataTypes = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    return res.status(200).json({error:false,login:login, dataLabels: dataLabels, dataVariables: dataVariables});
}
var getSidebarItems = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    return res.status(200).json({error: false, login:login, res: sideItems});
}

var getUsers = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    const {PosicionFila ,NoFilas, json} = req.body;
    var msg = {
        name: Users_id,
        num: users.length, 
        res: users
    };
    return res.status(200).json({error:false, login:login, res:msg});
}

var getVehicles = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    const {PosicionFila ,NoFilas,json} = req.body;
    var msg = {
        name:Vehicles_id,
        num:vehicles.length, 
        res:vehicles,
        report:IOTReports,
    };
    return res.status(200).json({error:false, login:login, res:msg});
}
var getVehicleTypes = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    var msg = {
        name:VehicleTypes_id,
        num:vehicleTypes.length, 
        res:vehicleTypes
    };
    return res.status(200).json({error:false, login:login, res:msg});
}
var getMaintainanceRoutine = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    var msg = {
        name:MaintainanceRoutine_id,
        num:maintainanceRoutines.length, 
        res:maintainanceRoutines
    };
    return res.status(200).json({error:false, login:login, res:msg});
}
var getMaintainancePlanning = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    var msg = {
        name:MaintainancePlanning_id,
        num:maintainancePlannings.length, 
        res:maintainancePlannings
    };
    return res.status(200).json({error:false, login:login, res:msg});
}
var getAlerts = async(req, res)=>{
    login = {correo: req.session.correo,rol: req.session.rol}
    var msg = {
        name:Alerts_id,
        num:alerts.length, 
        res:alerts
    };
    return res.status(200).json({error:false, login:login, res:msg});
}
// update functions
var writeUsers = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var Id;
    var order;
    if(data["Id"] != "") {
        Id = data["Id"];
        users.forEach((item, index) => {
            if(item["Id"] == data["Id"]) order = index;
        });
        users.splice(order, 1, data);
    }else {
        Id = users[users.length - 1]["Id"] + 1;
        data["Id"] = Id;
        users.push(data);
    }
    return res.status(200).json({success: true, login:login, result: users});
}
var writeVehicles = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var Id;
    var order;
    if(data["Id"] != "") {
        Id = data["Id"];
        vehicles.forEach((item, index) => {
            if(item["Id"] == data["Id"]) order = index;
        });
        vehicles.splice(order, 1, data);
    }else {
        Id = vehicles[vehicles.length - 1]["Id"] + 1;
        data["Id"] = Id;
        vehicles.push(data);
    }
    return res.status(200).json({success: true, login:login, result: vehicles});
}
var writeVehicleTypes = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var Id;
    var order;
    if(data["Id"] != "") {
        Id = data["Id"];
        vehicleTypes.forEach((item, index) => {
            if(item["Id"] == data["Id"]) order = index;
        });
        vehicleTypes.splice(order, 1, data);
    }else {
        Id = vehicleTypes[vehicleTypes.length - 1]["Id"] + 1;
        data["Id"] = Id;
        vehicleTypes.push(data);
    }
    return res.status(200).json({success: true, login:login, result: vehicleTypes});
}
var writeMaintainanceRoutine = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var Id;
    var order;
    if(data["Id"] != "") {
        Id = data["Id"];
        maintainanceRoutines.forEach((item, index) => {
            if(item["Id"] == data["Id"]) order = index;
        });
        maintainanceRoutines.splice(order, 1, data);
    }else {
        Id = maintainanceRoutines[maintainanceRoutines.length - 1]["Id"] + 1;
        data["Id"] = Id;
        maintainanceRoutines.push(data);
    }
    return res.status(200).json({success: true, login:login, result: maintainanceRoutines});
}
var writeMaintainancePlanning = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var Id;
    var order;
    if(data["Id"] != "") {
        Id = data["Id"];
        maintainancePlannings.forEach((item, index) => {
            if(item["Id"] == data["Id"]) order = index;
        });
        maintainancePlannings.splice(order, 1, data);
    }else {
        Id = maintainancePlannings[maintainancePlannings.length - 1]["Id"] + 1;
        data["Id"] = Id;
        maintainancePlannings.push(data);
    }
    return res.status(200).json({success: true, login:login, result: maintainancePlannings});
}
var writeAlerts = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var Id;
    var order;
    if(data["Id"] != "") {
        Id = data["Id"];
        alerts.forEach((item, index) => {
            if(item["Id"] == data["Id"]) order = index;
        });
        alerts.splice(order, 1, data);
    }else {
        Id = alerts[alerts.length - 1]["Id"] + 1;
        data["Id"] = Id;
        alerts.push(data);
    }
    return res.status(200).json({success: true, login:login, result: alerts});
}
// delete functions
var deleteUsers = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["Id"]) {
        Id = data["Id"];
        users.forEach((item, index) => {
            if(item["Id"] == data["Id"]) order = index;
        });
        users.splice(order, 1);
        return res.status(200).json({success: true, login:login, result: users});
    }else {
        return res.status(200).json({success: false, login:login, result: users});
    }
}
var deleteVehicles = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["Id"]) {
        Id = data["Id"];
        vehicles.forEach((item, index) => {
            if(item["Id"] == data["Id"]) order = index;
        });
        vehicles.splice(order, 1);
        return res.status(200).json({success: true, login:login, result: vehicles});
    }else {
        return res.status(200).json({success: false, login:login, result: vehicles});
    }
}
var deleteVehicleTypes = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["Id"]) {
        Id = data["Id"];
        vehicleTypes.forEach((item, index) => {
            if(item["Id"] == data["Id"]) order = index;
        });
        vehicleTypes.splice(order, 1);
        return res.status(200).json({success: true, login:login, result: vehicleTypes});
    }else {
        return res.status(200).json({success: false, login:login, result: vehicleTypes});
    }
}
var deleteMaintainanceRoutine = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["Id"]) {
        Id = data["Id"];
        maintainanceRoutines.forEach((item, index) => {
            if(item["Id"] == data["Id"]) order = index;
        });
        maintainanceRoutines.splice(order, 1);
        return res.status(200).json({success: true, login:login, result: maintainanceRoutines});
    }else {
        return res.status(200).json({success: false, login:login, result: maintainanceRoutines});
    }
}

var deleteMaintainancePlanning = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["Id"]) {
        Id = data["Id"];
        maintainancePlannings.forEach((item, index) => {
            if(item["Id"] == data["Id"]) order = index;
        });
        maintainancePlannings.splice(order, 1);
        return res.status(200).json({success: true, login:login, result: maintainancePlannings});
    }else {
        return res.status(200).json({success: false, login:login, result: maintainancePlannings});
    }
}

var deleteAlerts = (req, res) => {
    login = {correo: req.session.correo,rol: req.session.rol}
    var data = req.body;
    var order;
    if(data["Id"]) {
        Id = data["Id"];
        alerts.forEach((item, index) => {
            if(item["Id"] == data["Id"]) order = index;
        });
        alerts.splice(order, 1);
        return res.status(200).json({success: true, login:login, result: alerts});
    }else {
        return res.status(200).json({success: false, login:login, result: alerts});
    }
}

module.exports  = {
    getDataTypes,
    getSidebarItems,

    getUsers,
    getVehicles,
    getVehicleTypes,
    getMaintainanceRoutine,
    getMaintainancePlanning,
    getAlerts,

    writeUsers,
    writeVehicles,
    writeVehicleTypes,
    writeMaintainanceRoutine,
    writeMaintainancePlanning,
    writeAlerts,

    deleteUsers,
    deleteVehicles,
    deleteVehicleTypes,
    deleteMaintainanceRoutine,
    deleteMaintainancePlanning,
    deleteAlerts,
}

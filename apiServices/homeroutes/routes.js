var express = require("express");
var router = express.Router();
var controller = require("./controller.js");
const{error,isAuth} = require("../../middleware/apiServices.js");


// se envia los items de la barra de direccines si tiene permisos
router.get( "/homesidebar", isAuth, controller.getSidebarItems );

// se envia la informacion de usuarios si se tiene permiso
// get
router.get( "/dataTypes", isAuth, controller.getDataTypes);
// get functions
router.post( "/Users"    , isAuth, controller.getUsers );
router.post( "/Vehicles"   , isAuth, controller.getVehicles );
router.post( "/VehicleTypes"   , isAuth, controller.getVehicleTypes );
router.post( "/MaintainanceRoutine"   , isAuth, controller.getMaintainanceRoutine );
router.post( "/MaintainancePlanning"   , isAuth, controller.getMaintainancePlanning );
router.post( "/Alerts"     , isAuth, controller.getAlerts);

// update
router.post( "/writeUsers"    , isAuth, controller.writeUsers );
router.post( "/writeVehicles"   , isAuth, controller.writeVehicles );
router.post( "/writeVehicleTypes"   , isAuth, controller.writeVehicleTypes );
router.post( "/writeMaintainanceRoutine"   , isAuth, controller.writeMaintainanceRoutine );
router.post( "/writeMaintainancePlanning"   , isAuth, controller.writeMaintainancePlanning );
router.post( "/writeAlerts"     , isAuth, controller.writeAlerts);
// delete
router.post( "/deleteUsers"    , isAuth, controller.deleteUsers );
router.post( "/deleteVehicles"   , isAuth, controller.deleteVehicles );
router.post( "/deleteVehicleTypes"   , isAuth, controller.deleteVehicleTypes );
router.post( "/deleteMaintainanceRoutine"   , isAuth, controller.deleteMaintainanceRoutine );
router.post( "/deleteMaintainancePlanning"   , isAuth, controller.deleteMaintainancePlanning );
router.post( "/deleteAlerts"     , isAuth, controller.deleteAlerts);


/*
router.post( "/Usuarios"    , isAuth, controller.getUsers       );
router.post( "/Vehiculos"   , isAuth, controller.getVehicles    );
router.post( "/Alertas"     , isAuth, controller.getAlertas     );
*/
module.exports = router;
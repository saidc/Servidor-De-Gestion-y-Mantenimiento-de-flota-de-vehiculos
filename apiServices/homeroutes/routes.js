var express = require("express");
var router = express.Router();
var controller = require("./controller.js");
const{error,isAuth} = require("../../middleware/apiServices.js");


// se envia los items de la barra de direccines si tiene permisos
router.get( "/homesidebar", isAuth, controller.getSidebarItems );

// se envia la informacion de usuarios si se tiene permiso
// get
router.get( "/dataTypes", isAuth, controller.getDataTypes);

router.post( "/updateoptionsforselect", isAuth, controller.updateoptionsforselect);
router.post( "/gettipodevehiculosbyId", isAuth, controller.gettipodevehiculosbyId);
router.post( "/getVEHICULO_BY_PLACA_DE_VEHICULO", isAuth, controller.getVEHICULO_BY_PLACA_DE_VEHICULO);

// get functions
router.post( "/Usuarios"    , isAuth, controller.getUsuarios );
router.post( "/Vehiculos"   , isAuth, controller.getVehiculos );
router.post( "/Tiposdevehiculos"   , isAuth, controller.getTiposdevehiculos );
router.post( "/RutinasDeMantenimiento"   , isAuth, controller.getRutinasDeMantenimiento );
router.post( "/PlaneacionesDeMantenimiento"   , isAuth, controller.getPlaneacionesDeMantenimiento );
router.post( "/Alertas"     , isAuth, controller.getAlertas);
router.post( "/VEHICULO_USUARIO"     , isAuth, controller.getVEHICULO_USUARIO);

// update
router.post( "/writeUsuarios"    , isAuth, controller.writeUsuarios );
router.post( "/writeVehiculos"   , isAuth, controller.writeVehiculos );
router.post( "/writeTiposdevehiculos"   , isAuth, controller.writeTiposdevehiculos );
router.post( "/writeRutinasDeMantenimiento"   , isAuth, controller.writeRutinasDeMantenimiento );
router.post( "/writePlaneacionesDeMantenimiento"   , isAuth, controller.writePlaneacionesDeMantenimiento );
router.post( "/writeAlertas"     , isAuth, controller.writeAlertas);
router.post( "/writeVEHICULO_USUARIO"     , isAuth, controller.writeVEHICULO_USUARIO);

// delete
router.post( "/deleteUsuarios"    , isAuth, controller.deleteUsuarios );
router.post( "/deleteVehiculos"   , isAuth, controller.deleteVehiculos );
router.post( "/deleteTiposdevehiculos"   , isAuth, controller.deleteTiposdevehiculos );
router.post( "/deleteRutinasDeMantenimiento"   , isAuth, controller.deleteRutinasDeMantenimiento );
router.post( "/deletePlaneacionesDeMantenimiento"   , isAuth, controller.deletePlaneacionesDeMantenimiento );
router.post( "/deleteAlertas"     , isAuth, controller.deleteAlertas);
router.post( "/deleteVEHICULO_USUARIO"     , isAuth, controller.deleteVEHICULO_USUARIO);


/*
router.post( "/Usuarios"    , isAuth, controller.getUsuarios       );
router.post( "/Vehiculos"   , isAuth, controller.getVehiculos    );
router.post( "/Alertas"     , isAuth, controller.getAlertas     );
*/
module.exports = router;
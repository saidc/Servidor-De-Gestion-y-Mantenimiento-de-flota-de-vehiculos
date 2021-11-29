var express = require("express");
var router = express.Router();
var controller = require("./controller.js");
const{error,isAuth} = require("../../middleware/apiServices.js");


// se envia los items de la barra de direccines si tiene permisos
router.get( "/homesidebar", isAuth, controller.getSidebarItems );

// se envia la informacion de usuarios si se tiene permiso
// get
router.get( "/dataTypes", isAuth, controller.getDataTypes);

router.post( "/actualizaroptionsforselect", isAuth, controller.actualizaroptionsforselect);
router.post( "/gettipodevehiculosbyId", isAuth, controller.gettipodevehiculosbyId);
router.post( "/getRutinademantenimientobyid", isAuth, controller.getRutinademantenimientobyid);
router.post( "/getVEHICULO_BY_PLACA_DE_VEHICULO", isAuth, controller.getVEHICULO_BY_PLACA_DE_VEHICULO);
router.post( "/getUSUARIO_BY_CORREO", isAuth, controller.getUSUARIO_BY_CORREO);

// get functions
router.post( "/Usuarios"    , isAuth, controller.getUsuarios );
router.post( "/Vehiculos"   , isAuth, controller.getVehiculos );
router.post( "/Tiposdevehiculos"   , isAuth, controller.getTiposdevehiculos );
router.post( "/RutinasDeMantenimiento"   , isAuth, controller.getRutinasDeMantenimiento );
router.post( "/PlaneacionesDeMantenimiento"   , isAuth, controller.getPlaneacionesDeMantenimiento );
router.post( "/Alertas"     , isAuth, controller.getAlertas);
router.post( "/VEHICULO_USUARIO"     , isAuth, controller.getVEHICULO_USUARIO);
router.post( "/reporte"     , isAuth, controller.getreporte);
router.post( "/reportefiltro"     , isAuth, controller.getreportefiltro);

// actualizar
router.post( "/writeUsuarios"    , isAuth, controller.writeUsuarios );
router.post( "/writeVehiculos"   , isAuth, controller.writeVehiculos );
router.post( "/writeTiposdevehiculos"   , isAuth, controller.writeTiposdevehiculos );
router.post( "/writeRutinasDeMantenimiento"   , isAuth, controller.writeRutinasDeMantenimiento );
router.post( "/writePlaneacionesDeMantenimiento"   , isAuth, controller.writePlaneacionesDeMantenimiento );
//router.post( "/writeAlertas"     , isAuth, controller.writeAlertas);
router.post( "/writeVEHICULO_USUARIO"     , isAuth, controller.writeVEHICULO_USUARIO);

// eliminar
router.post( "/eliminarUsuarios"    , isAuth, controller.eliminarUsuarios );
router.post( "/eliminarVehiculos"   , isAuth, controller.eliminarVehiculos );
router.post( "/eliminarTiposdevehiculos"   , isAuth, controller.eliminarTiposdevehiculos );
router.post( "/eliminarRutinasDeMantenimiento"   , isAuth, controller.eliminarRutinasDeMantenimiento );
router.post( "/eliminarPlaneacionesDeMantenimiento"   , isAuth, controller.eliminarPlaneacionesDeMantenimiento );
router.post( "/eliminarAlertas"     , isAuth, controller.eliminarAlertas);
router.post( "/eliminarVEHICULO_USUARIO"     , isAuth, controller.eliminarVEHICULO_USUARIO);


/*
router.post( "/Usuarios"    , isAuth, controller.getUsuarios       );
router.post( "/Vehiculos"   , isAuth, controller.getVehiculos    );
router.post( "/Alertas"     , isAuth, controller.getAlertas     );
*/
module.exports = router;
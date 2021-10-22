var express = require("express");
var router = express.Router();
var controller = require("./controller.js");
const{error,isAuth} = require("../../middleware/apiServices.js");


// se envia los items de la barra de direccines si tiene permisos
router.get( "/homesidebar", isAuth, controller.getSidebarItems );

// se envia la informacion de usuarios si se tiene permiso
router.post( "/Usuarios"    , isAuth, controller.getUsers       );
router.post( "/Vehiculos"   , isAuth, controller.getVehicles    );
router.post( "/Alertas"     , isAuth, controller.getAlertas     );

module.exports = router;
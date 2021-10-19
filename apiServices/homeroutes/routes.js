var express = require("express");
var router = express.Router();
const{error,isAuth} = require("../../middleware/apiServices.js");

router.get( "/homesidebar", isAuth, async(req, res)=>{
    var msg = [
        {content: "Usuarios"  , id:"Usuarios"},
        {content: "Vehiculos" , id:"Vehiculos"},
        {content: "Alertas"   , id:"Alertas"}
    ];
    return res.status(200).json({error:false, res:msg});
});
router.post( "/Usuarios", isAuth, async(req, res)=>{
    var msg = [
        {content: "Usuario" , id:"1"},
        {content: "Usuario" , id:"2"},
        {content: "Usuario" , id:"3"}
    ];
    return res.status(200).json({error:false, res:msg});
});
router.post( "/Vehiculos", isAuth, async(req, res)=>{
    var msg = [
        {content: "Vehiculo" , id:"1"},
        {content: "Vehiculo" , id:"2"},
        {content: "Vehiculo" , id:"3"}
    ];
    return res.status(200).json({error:false, res:msg});
});
router.post( "/Alertas", isAuth, async(req, res)=>{
    var msg = [
        {content: "Alerta" , id:"1"},
        {content: "Alerta" , id:"2"},
        {content: "Alerta" , id:"3"}
    ];
    return res.status(200).json({error:false, res:msg});
});

module.exports = router;
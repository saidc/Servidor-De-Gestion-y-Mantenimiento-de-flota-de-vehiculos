var express = require("express");
var router = express.Router();
const{error,isAuth} = require("../../middleware/apiServices.js");
const {user} = require("../../services/sql/index.js");


router.get( "/homesidebar", isAuth, async(req, res)=>{
    var msg = [
        {content: "Usuarios"  , id:"Usuarios"},
        {content: "Vehiculos" , id:"Vehiculos"},
        {content: "Alertas"   , id:"Alertas"}
    ];
    return res.status(200).json({error:false, res:msg});
});
router.post( "/Usuarios", isAuth, async(req, res)=>{
    const {PosicionFila ,NoFilas,json} = req.body;
    console.log(PosicionFila ,NoFilas);
    user.getNumberOfUsuarios((error, results, fields)=>{
        if(error){
            return res.status(200).json({error:true, res:error});
        }else{
            var NumRows = results[0].NumRow;
            user.getUsuariosPosNoRows(PosicionFila ,NoFilas,(error, results, fields)=>{
                if(error){
                    return res.status(200).json({error:true, res:error});
                }else{
                    console.log(results); 
                    var msg = {
                        numusers:NumRows, 
                        users:results
                    };
                    return res.status(200).json({error:false, res:msg});
                }
            });
        } 
    });
    /*
    var msg = [
        {content: "Usuario1" , id:"1"},
        {content: "Usuario2" , id:"2"},
        {content: "Usuario3" , id:"3"}
    ];
    return res.status(200).json({error:false, res:msg});
    */
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
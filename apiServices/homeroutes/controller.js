const {user,vehiculo} = require("../../services/sql/index.js");

var getSidebarItems = async(req, res)=>{
    var msg = [
        {content: "Usuarios"  , id:"Usuarios"},
        {content: "Vehiculos" , id:"Vehiculos"},
        {content: "Alertas"   , id:"Alertas"}
    ];
    return res.status(200).json({error:false, res:msg});
}

var getUsers = async(req, res)=>{
    const {PosicionFila ,NoFilas,json} = req.body;
    //console.log(PosicionFila ,NoFilas);
    user.getNumberOfUsuarios((error, results, fields)=>{
        if(error){
            return res.status(200).json({error:true, res:error});
        }else{
            var NumRows = results[0].NumRow;
            user.getUsuariosPosNoRows(PosicionFila ,NoFilas,(error, results, fields)=>{
                if(error){
                    return res.status(200).json({error:true, res:error});
                }else{
                    //console.log(results); 
                    var msg = {
                        name:"Usuarios",
                        num:NumRows, 
                        res:results
                    };
                    return res.status(200).json({error:false, res:msg});
                }
            });
        } 
    });
}

var getVehicles = async(req, res)=>{
    const {PosicionFila ,NoFilas,json} = req.body;
    //console.log(PosicionFila ,NoFilas);
    vehiculo.getNumberOfVehiculos((error, results, fields)=>{
        if(error){
            return res.status(200).json({error:true, res:error});
        }else{ 
            var NumRows = results[0].NumRow;
            vehiculo.getVehiculosPosNoRows(0,10,(error, results, fields)=>{
                if(error){
                    return res.status(200).json({error:true, res:error});
                }else{
                    var msg = {
                        name:"Vehiculos",
                        num:NumRows, 
                        res:results
                    };
                    return res.status(200).json({error:false, res:msg});
                }
            });
        }
    });
}

var getAlertas = async(req, res)=>{
    var msg = [
        {content: "Alerta" , id:"1" , description: "random description 1"},
        {content: "Alerta" , id:"2" , description: "random description 2"},
        {content: "Alerta" , id:"3" , description: "random description 3"}
    ];
    return res.status(200).json({error:false, res:msg});
}

module.exports  = {
    getSidebarItems,
    getUsers,
    getVehicles,
    getAlertas
}

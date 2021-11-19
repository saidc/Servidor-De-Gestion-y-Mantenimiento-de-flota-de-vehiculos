var sql = require("../services/sql/index.js"); 

var randomIntFromInterval = (min, max) =>{ // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


var savedata = (data)=>{
  const obj = JSON.parse(data)
  if(typeof obj === 'object'){
    if(obj.hasOwnProperty("table_name")){
      if(obj["table_name"] == "report"){
        PLACA = null
        FECHA = null
        SPEED = null
        RPM = null
        LATITUD = null
        LONGITUD = null
        GRUPO = null
        BATERIA = null
        DISTANCE_W_MIL = null
        DISTANCE_SINCE_DTC_CLEAR = null
        ALERTA = null

        if(obj.hasOwnProperty("PLACA"))                     { PLACA = obj["PLACA"];                                         }
        if(obj.hasOwnProperty("FECHA"))                     { FECHA = obj["FECHA"];                                         }
        if(obj.hasOwnProperty("SPEED"))                     { SPEED = obj["SPEED"];                                         }
        if(obj.hasOwnProperty("RPM"))                       { RPM = obj["RPM"];                                             }
        if(obj.hasOwnProperty("LATITUD"))                   { LATITUD = obj["LATITUD"];                                   }
        if(obj.hasOwnProperty("LONGITUD"))                  { LONGITUD = obj["LONGITUD"];                                   }
        //if(obj.hasOwnProperty("GRUPO"))                     { GRUPO = obj["GRUPO"];                                         }
        //if(obj.hasOwnProperty("BATERIA"))                   { BATERIA = obj["BATERIA"];                                     }
        if(obj.hasOwnProperty("DISTANCE_W_MIL"))            { DISTANCE_W_MIL = obj["DISTANCE_W_MIL"];                       }
        if(obj.hasOwnProperty("DISTANCE_SINCE_DTC_CLEAR"))  { DISTANCE_SINCE_DTC_CLEAR = obj["DISTANCE_SINCE_DTC_CLEAR"];   }
        if(obj.hasOwnProperty("ALERTA"))                    { ALERTA = obj["ALERTA"];                                       }
        if(obj.hasOwnProperty("USER"))                      { USER   = obj["USER"];                                       }
        
        sql.reporte.CrearReporte(PLACA   ,FECHA               ,GRUPO,BATERIA,LATITUD             , LONGITUD            , SPEED              , RPM   , DISTANCE_W_MIL, DISTANCE_SINCE_DTC_CLEAR, ALERTA,USER,(error, results, fields)=>{
        //reporte.CrearReporte("FWW722", "21-11-18 15:19:02", null, null  ,"10.495770012974535", "-73.26421998702547", "84.80480961564261", "4000", null          , null                    , "sobre revolucionado",(error, results, fields)=>{
            if(error){
              //throw error;
              print(error)
            }
            //console.log(results);
        });

      }
    }
  }
}

var onConnection = (socket) => {
    //Socket is a Link to the Client
    console.log("New Client is Connected!", socket.id);
    var sesion = { socket_id: socket.id , car: null}
    //socket.emit("welcome", "Hello and Welcome to the Server");
    socket.on('server', (msg) => {
      socket.emit("client", "OK"); // es necesario enviar de vuelta el mensaje recibido 
      if(sesion.car != null){
        //console.log("dispositivo "+socket.id +" esta autenticado " + sesion.car)
        //console.log('receive data from: ' +socket.id + ": "+ msg);
        savedata(msg)
        var ok = {error: false }
        socket.emit("update",JSON.stringify(ok))  
      }else{
        //console.log("no authenticado ")
        socket.disconnect() // si un cliente no esta authenticado este lo desconectara
      }
    });
    socket.on('auth', (msg) => {
      if(sesion.car == null){
        try{
          const obj = JSON.parse(msg)
          if(typeof obj === 'object'){
            if(obj.hasOwnProperty('PLACA')){
              // se verifica si la placa corresponde a un vehiculo existente
              sql.vehiculo.getID_Vehiculo(obj["PLACA"],(error, results, fields)=>{
                if(error){
                    throw error;
                }
                if(results.constructor.name == "Array"){
                    var ok = null
                    // si hay una o mas respuestas entonces si es un vehiculo o
                    // dispositivo el cual guardar datos o analizar
                    if(results.length > 0){
                      sesion.car = obj["PLACA"]
                      sesion.token = randomIntFromInterval(1000000, 1999999)
                      ok = {error: false,auth: true, token: randomIntFromInterval(1000000, 1999999)}
                      //console.log("authenticado correctamente")
                    }else{
                      ok = {error: false,auth: false}
                    }
                    socket.emit("auth",JSON.stringify(ok)) 
                    // se buscara el usuario asignado a dicho vehiculo y se enviara 
                    if(ok.auth){
                      sql.usuario_vehiculo.GetUsuario_byPlaca(obj["PLACA"],(error2, results2, fields2)=>{
                        if(error){
                            throw error;
                        }
                        console.log(results);
                        if(results2.constructor.name == "Array"){
                          if(results2.length > 0){
                            var ok = {error: false, user: results2 }
                            socket.emit("update",JSON.stringify(ok))  
                          }
                        }
                      });
                    }
                }
              });
               
            }
          }
        }catch(err){
          console.log("error of cast json")
          var ok = {error: true}
          socket.emit("update",JSON.stringify(ok))  
        }
      }
    });
    socket.on('update', (msg) => {
      console.log('receive update request: ' +socket.id +': '+ msg);
    });
    socket.on('disconnect', () => {
      console.log('user '+ socket.id +' disconnected');
    });
}

module.exports  = {
    onConnection
}
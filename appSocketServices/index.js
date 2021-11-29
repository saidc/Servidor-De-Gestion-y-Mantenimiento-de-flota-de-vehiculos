var sql = require("../services/sql/index.js"); 

var randomIntFromInterval = (min, max) =>{ // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var CrearAlerta = (TIPODEALERTA, DESCRIPCION, PLACA_DE_VEHICULO, PRIORIDAD,FECHA)=>{
  sql.alert.CrearAlerta(TIPODEALERTA, DESCRIPCION, PLACA_DE_VEHICULO, PRIORIDAD,FECHA, (error, results, fields)=>{
    if(error){
      console.log(error)
    }
  });
}

var savedata = (data)=>{
  const obj = JSON.parse(data)
  if(typeof obj === 'object'){
    if(obj.hasOwnProperty("table_name")){
      if(obj["table_name"] == "report"){
        PLACA_DE_VEHICULO = null
        FECHA = null
        SPEED = null
        RPM = null
        LATITUD = null
        LONGITUD = null
        GRUPO = null
        BATERIA = null
        DISTANCE_W_MIL = null
        DISTANCE_SINCE_DTC_CLEAR = null
        ESTADO_DE_VEHICULO = null

        if(obj.hasOwnProperty("PLACA_DE_VEHICULO"))         { PLACA_DE_VEHICULO = obj["PLACA_DE_VEHICULO"];                 }
        if(obj.hasOwnProperty("FECHA"))                     { FECHA = obj["FECHA"];                                         }
        if(obj.hasOwnProperty("SPEED"))                     { SPEED = obj["SPEED"];                                         }
        if(obj.hasOwnProperty("RPM"))                       { RPM = obj["RPM"];                                             }
        if(obj.hasOwnProperty("LATITUD"))                   { LATITUD = obj["LATITUD"];                                     }
        if(obj.hasOwnProperty("LONGITUD"))                  { LONGITUD = obj["LONGITUD"];                                   }
        //if(obj.hasOwnProperty("GRUPO"))                   { GRUPO = obj["GRUPO"];                                         }
        //if(obj.hasOwnProperty("BATERIA"))                 { BATERIA = obj["BATERIA"];                                     }
        if(obj.hasOwnProperty("DISTANCE_W_MIL"))            { DISTANCE_W_MIL = obj["DISTANCE_W_MIL"];                       }
        if(obj.hasOwnProperty("DISTANCE_SINCE_DTC_CLEAR"))  { DISTANCE_SINCE_DTC_CLEAR = obj["DISTANCE_SINCE_DTC_CLEAR"];   }
        if(obj.hasOwnProperty("ESTADO_DE_VEHICULO"))        { ESTADO_DE_VEHICULO = obj["ESTADO_DE_VEHICULO"];               }
        if(obj.hasOwnProperty("USER"))                      { USER   = obj["USER"];                                         }
        
        sql.reporte.CrearReporte(PLACA_DE_VEHICULO   ,FECHA               ,GRUPO,BATERIA,LATITUD             , LONGITUD            , SPEED              , RPM   , DISTANCE_W_MIL, DISTANCE_SINCE_DTC_CLEAR, ESTADO_DE_VEHICULO,USER,(error, results, fields)=>{
            if(error){
              print(error)
            }
        });

      }
    }
  }
}

var procesarData = (data,sesion)=>{
  const obj = JSON.parse(data)
  PLACA_DE_VEHICULO    = null
  FECHA    = null
  SPEED    = null
  RPM      = null
  USER     = null
  LATITUD  = null
  LONGITUD = null
  ESTADO_DE_VEHICULO = null

  if(obj.hasOwnProperty("PLACA_DE_VEHICULO"))    { PLACA_DE_VEHICULO = obj["PLACA_DE_VEHICULO"];       }
  if(obj.hasOwnProperty("FECHA"))    { FECHA = obj["FECHA"];       }
  if(obj.hasOwnProperty("SPEED"))    { SPEED = obj["SPEED"];       }
  if(obj.hasOwnProperty("RPM"))      { RPM = obj["RPM"];           }
  if(obj.hasOwnProperty("ESTADO_DE_VEHICULO"))   { ESTADO_DE_VEHICULO = obj["ESTADO_DE_VEHICULO"];     }
  if(obj.hasOwnProperty("USER"))     { USER   = obj["USER"];       }
  if(obj.hasOwnProperty("LATITUD"))  { LATITUD = obj["LATITUD"];   }
  if(obj.hasOwnProperty("LONGITUD")) { LONGITUD = obj["LONGITUD"]; }
  
    // identificar Alerta de Carro encendido y sin authenticacion o usuario no autorizado  
    if(ESTADO_DE_VEHICULO != null){
      if(USER == null && ESTADO_DE_VEHICULO  != "apagado" ){
        CrearAlerta('encendido', `Vehiculo encendido sin autorizacion, en LATITUD:${LATITUD} , LONGITUD:${LONGITUD}`, PLACA_DE_VEHICULO , 'media',FECHA)
      }else if( USER != null && ESTADO_DE_VEHICULO  != "apagado" ){
        sql.usuario_vehiculo.GetUsuario_byPlaca(obj["PLACA_DE_VEHICULO"],(error2, results2, fields2)=>{
          if(error2){
            console.log(error2)
          }else{
            console.log(results2);
            if(results2.constructor.name == "Array"){
              if(results2.length > 0){
                sw = false;
                for( var i = 0 ;i< results2.length ;i++){
                  var email = results2[i]["CORREO"];
                  if(email == USER){
                    sw = true;
                  }
                }
                if(!sw){
                  CrearAlerta('encendido', `Vehiculo encendido por usuario no autorizado, en LATITUD:${LATITUD} , LONGITUD:${LONGITUD}`, PLACA_DE_VEHICULO , 'media',FECHA)
                }
              }
            }
          }
        });
      }
    }

    if(FECHA != null){
      // identificar Alerta por sobre revolucion 
      if(RPM != null){
        if(RPM > 3000){
          CrearAlerta('revolucion', `Vehiculo sobrepaso la revolucion maxima de 3000 RPM, con un valor de ${RPM}`, PLACA_DE_VEHICULO , 'baja',FECHA)
        }
      } 
      // identificar Alerta por exceso de velocidad
      if(SPEED != null){
        if(SPEED > 100){
          CrearAlerta('velocidad', `Vehiculo sobrepasó la velocidad maxima de 100 kmh, con un valor de ${SPEED}`, PLACA_DE_VEHICULO , 'baja',FECHA)
        }
      }

      // identificar 
    }
}

var onConnection = (socket) => {
    //Socket is a Link to the Client
    console.log("New Client is Connected!", socket.id);
    var sesion = { socket_id: socket.id , car: null}

    socket.on('server', (msg) => {
      socket.emit("client", "OK"); // es necesario enviar de vuelta el mensaje recibido 
      // se verifica que el dispositivo haya sido autenticado
      if(sesion.car != null){
        // se almacena la informacion recibida 
        savedata(msg)
        // se procesa la data recibida
        procesarData(msg,sesion)
        var ok = {error: false }
        socket.emit("update",JSON.stringify(ok))  
      }else{
        //console.log("no authenticado ")
        socket.disconnect() // si un cliente no esta authenticado este lo desconectara
      }
    });
    // solicitud de autenticacion 
    socket.on('auth', (msg) => {
      if(sesion.car == null){
        try{
          const obj = JSON.parse(msg)
          if(typeof obj === 'object'){
            if(obj.hasOwnProperty('PLACA_DE_VEHICULO')){
              // se verifica si la placa corresponde a un vehiculo existente
              sql.vehiculo.getID_Vehiculo(obj["PLACA_DE_VEHICULO"],(error, results, fields)=>{
                
                if(error){
                  console.log(error)
                }else{
                  console.log("get id vehiculo ",results)
                  if(results.constructor.name == "Array"){
                      var ok = null
                      // si hay una o mas respuestas entonces si es un vehiculo o
                      // dispositivo el cual guardar datos o analizar
                      if(results.length > 0){
                        sesion.car = obj["PLACA_DE_VEHICULO"]
                        sesion.token = randomIntFromInterval(1000000, 1999999)
                        ok = {error: false,auth: true, token: randomIntFromInterval(1000000, 1999999)}
                        //console.log("authenticado correctamente")
                      }else{
                        ok = {error: false,auth: false}
                      }
                      socket.emit("auth",JSON.stringify(ok)) 
                      // se buscara el usuario asignado a dicho vehiculo y se enviara 
                      if(ok.auth){
                        sql.usuario_vehiculo.GetUsuario_byPlaca(obj["PLACA_DE_VEHICULO"],(error2, results2, fields2)=>{
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

                }
              });
            }
          }
        }catch(err){
          console.log("error of cast json: ",err)
          var ok = {error: true}
          socket.emit("update",JSON.stringify(ok))  
        }
      }else{
        //console.log("session car not null: ",sesion.car);
      }
    });
    socket.on('update', (msg) => {
      console.log('receive update request: ' +socket.id +': '+ msg);
    });
    socket.on('disconnect', () => {
      console.log('user '+ socket.id +' disconnected');
    });
    socket.on('test', (msg) => {
      console.log("test: ",msg)
      socket.emit("client", "OK"); // es necesario enviar de vuelta el mensaje recibido 
      // se verifica que el dispositivo haya sido autenticado
      //if(sesion.car != null){
      //  // se almacena la informacion recibida 
      //  savedata(msg)
      //  // se procesa la data recibida
      //  procesarData(msg,sesion)
      //  var ok = {error: false }
      //  socket.emit("update",JSON.stringify(ok))  
      //}else{
      //  //console.log("no authenticado ")
      //  socket.disconnect() // si un cliente no esta authenticado este lo desconectara
      //}
    });
}

module.exports  = {
    onConnection
}
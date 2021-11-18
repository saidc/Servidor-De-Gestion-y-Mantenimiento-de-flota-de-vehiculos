var sql = require("../services/sql/index.js"); 

var randomIntFromInterval = (min, max) =>{ // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
var savedata = (data)=>{
  const obj = JSON.parse(data)
  if(typeof obj === 'object'){
    if(obj.hasOwnProperty("table_name")){
      if(obj["table_name" == "report"]){

        if(obj.hasOwnProperty("PLACA"))                     {                     }
        if(obj.hasOwnProperty("FECHA"))                     {                     }
        if(obj.hasOwnProperty("SPEED"))                     {                     }
        if(obj.hasOwnProperty("RPM"))                       {                     }
        if(obj.hasOwnProperty("Position"))                  {                     }

      //if(obj.hasOwnProperty("GRUPO"))                     {                     }
      //if(obj.hasOwnProperty("BATERIA"))                   {                     }
        if(obj.hasOwnProperty("DISTANCE_W_MIL"))            {                     }
        if(obj.hasOwnProperty("DISTANCE_SINCE_DTC_CLEAR"))  {                     }
        if(obj.hasOwnProperty("ALERTA"))                    {                     }
         
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
        console.log("dispositivo "+socket.id +" esta autenticado " + sesion.car)
        console.log('receive data from: ' +socket.id + ": "+ msg);
        savedata(msg)
        var ok = {error: false }
        socket.emit("update",JSON.stringify(ok))  
      }else{
        console.log("no authenticado ")
        socket.disconnect() // si un cliente no esta authenticado este lo desconectara
      }
    });
    socket.on('auth', (msg) => {
      if(sesion.car == null){
        try{
          const obj = JSON.parse(msg)
          if(typeof obj === 'object'){
            if(obj.hasOwnProperty('PLACA')){
              sql.vehiculo.getID_Vehiculo(obj["PLACA"],(error, results, fields)=>{
                if(error){
                    throw error;
                }
                if(results.constructor.name == "Array"){
                    var ok = null
                    if(results.length > 0){
                      sesion.car = obj["PLACA"]
                      sesion.token = randomIntFromInterval(1000000, 1999999)
                      ok = {error: false,auth: true, token: randomIntFromInterval(1000000, 1999999)}
                      console.log("authenticado correctamente")
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
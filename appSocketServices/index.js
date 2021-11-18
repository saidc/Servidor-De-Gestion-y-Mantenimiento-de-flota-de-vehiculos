 
var onConnection = (socket) => {
    //Socket is a Link to the Client
    console.log("New Client is Connected!", socket.id);
    //socket.emit("welcome", "Hello and Welcome to the Server");
    socket.on('server', (msg) => {
      socket.emit("client", "OK"); // es necesario enviar de vuelta el mensaje recibido 
      var ok = {error: false, msg:msg}
      socket.emit("update",JSON.stringify(ok))
      console.log('receive data from: ' +socket.id + ": "+ msg);
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
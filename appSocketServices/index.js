 
var onConnection = (socket) => {
    //Socket is a Link to the Client
    console.log("New Client is Connected!", socket.id);
    //Here the client is connected and we can exchanged
    //Send Message
    //We need to use the Socket (the link between the server and the connected user(s)).
    //socket.emit("welcome", "Hello and Welcome to the Server");
    socket.on('server', (msg) => {
      socket.emit("client", msg);
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

require('dotenv').config();
const path = require("path");
const config = require("../config/proyect.js");
/** se Busca la configuracion del proyecto en /config */
const PORT = config.PORT;

const app = require("../app.js");
/*
const SOCKET_SERVER_PORT = config.SOCKET_SERVER_PORT;
const http = require("http").createServer();
const io = require("socket.io")(http);
http.listen(SOCKET_SERVER_PORT, () => {
  console.log("Socket Server Is Running on Port: " + SOCKET_SERVER_PORT);
});
io.on("connection", (socket) => {
    //Socket is a Link to the Client
    console.log("New Client is Connected!", socket.id);
    //Here the client is connected and we can exchanged
    //Send Message
    //We need to use the Socket (the link between the server and the connected user(s)).
    socket.emit("welcome", "Hello and Welcome to the Server");
    socket.on('server', (msg) => {
      //--> //socket.emit("client", msg);
      //msg is the actual data which we can store in db
      //msg can be obj, string, int
      console.log('receive data from: ' +socket.id + ": "+ msg);
    });
});
*/
const link1= "http://127.0.0.1:"
const link2= "http://localhost:"

app.listen(PORT,()=> console.log(`Web Server is Listening on ${PORT}\nlink:\n${link1}${PORT}/\nOR\n${link2}${PORT}/`));

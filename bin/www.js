
require('dotenv').config();
const path = require("path");
const config = require("../config/proyect.js");
/** se Busca la configuracion del proyecto en /config */
const PORT = config.PORT;
//const SOCKET_SERVER_PORT = config.SOCKET_SERVER_PORT;
const {app} = require("../app.js");

const http = require("http").Server(app);
const io = require("socket.io")(http);
const SocketController = require("../appSocketServices/index.js");

io.on("connection", SocketController.onConnection );

const link1= "http://127.0.0.1:"
const link2= "http://localhost:"

http.listen(PORT, () => {
  console.log("Socket Server Is Running on Port: " + PORT);
});

//app.listen(PORT,()=> console.log(`Web Server is Listening on ${PORT}\nlink:\n${link1}${PORT}/\nOR\n${link2}${PORT}/`));

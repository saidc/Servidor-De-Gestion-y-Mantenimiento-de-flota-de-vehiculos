// Socket
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;

const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

function procesarBot(rta, socket ){
    var id = socket.id;
    var level = clientes[cliPos].level;
    if (level == "init"){
        if(rta == "1"){
            socket.send( "Bot: "+getlevel(Inconformidad,id));
        }else if(rta == "2"){
            socket.send( "Bot: "+getlevel(PronblemaDeDinero,id));
        }else{
            socket.send( "Bot: "+getlevel(init,id));
        }
    }else if(level == "inconformidad"){
        if(rta == "1"){
            socket.send( "Bot: "+getlevel(EnviarQueja,id));
        }else{
            socket.send( "Bot: "+getlevel(Volver,id));
        }
    }
}

io.on('connection', (socket) => {
    console.log('Client connected');
    // mensaje que se envia a todos los clientes conectados con el socket
    socket.emit("message", "se conecto un nuevo cliente: "+ socket.id +"\n");

    socket.on('disconnect', () => {
        // id de cliente desconectado socket.id
    });
    
    socket.on('message', (msg) => {
        //socket.emit("message", "me+"+socket.id+": "+ msg+"\n");

        // function procesar(msg, socket);
    });
});

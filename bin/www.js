require('dotenv').config();
const path = require("path");
const config = require(path.join(__dirname,"../config/proyect.js"));
/** se Busca la configuracion del proyecto en /config */
const PORT = config.PORT;
const app = require("../app.js");

app.listen(PORT,()=> console.log(`Listening on ${PORT}\nlink:\n
http://127.0.0.1:${PORT}/  \n OR \n 
http://localhost:${PORT}/`));

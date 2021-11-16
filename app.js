const express = require('express');
const path = require("path");
const bcrypt = require('bcryptjs'); // para generar hash de las contraseñas que se guardaran en la Base de datos 
const mysql = require('mysql');
const session = require('express-session'); // manejo de sessiones 
const MySQLStore = require('express-mysql-session')(session); // almacenamiento de id de session y otra info de auth
const sql_config = require("./config/sql.js"); // se carga la configuracion de conexion con la base de datos en sql
var   logger = require("morgan");
const bodyParser = require('body-parser'); // permite cargar los request del body en formato json 
const indexRouter = require("./routes/index.js"); // manejo de direcciones de la pagina
const { error } = require("./middleware");
const app = express();



// add session middleware
console.log(sql_config);
var sessionStore = new MySQLStore(sql_config); // se carga la config de conexion con sql para manejo de sessiones
app.use(session({
    key: 'saidcApp',
    secret: "cornelio",
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// view engine setup
//app.set("view engine", "pug");

app.use(express.json()); // ayuda a la lectura de req formato json en body

app.use(express.static(path.join(__dirname, "public")));

app.use("/",indexRouter);

app.use(error); 

module.exports = app ;
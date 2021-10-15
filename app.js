//var createError = require("http-errors");
const express = require('express');
const path = require("path");
const bcrypt = require('bcryptjs'); // para generar hash de las contraseñas que se guardaran en la Base de datos 
// var cookieParser = require("cookie-parser"); // manejo de solo cookies pero no maneja session y cifrado
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sql_config = require("./config/sql.js");
var logger = require("morgan");
const bodyParser = require('body-parser')
const indexRouter = require("./routes/index.js");
const { error404 , generarErrorHandler, error } = require("./middleware");
const app = express();

// add session middleware
var sessionStore = new MySQLStore(sql_config);
//const secrethash = await bcrypt.hash("cornelio", 12);
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
//app.set("views" , path.join( __dirname,"views")); // buscar funcionalidad
//app.set("view engine", "pug");

app.use(express.json()); // ayuda a la lectura de req formato json en body
// app.use(express.urlencoded({extended: false})); // Buscar funcionalidad

app.use(express.static(path.join(__dirname, "public")));

app.use("/",indexRouter);

app.use(error); 

module.exports = app ;
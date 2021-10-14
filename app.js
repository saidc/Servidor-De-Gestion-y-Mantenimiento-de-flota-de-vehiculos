//var createError = require("http-errors");
var express = require('express');
var path = require("path");
var bcrypt = require('bcryptjs'); // para generar hash de las contraseñas que se guardaran en la Base de datos 
// var cookieParser = require("cookie-parser"); // manejo de solo cookies pero no maneja session y cifrado
var session = require("express-session");
var logger = require("morgan");
var bodyParser = require('body-parser')

var indexRouter = require("./routes/index.js");
const { error404 , generarErrorHandler, error } = require("./middleware");
const app = express();
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
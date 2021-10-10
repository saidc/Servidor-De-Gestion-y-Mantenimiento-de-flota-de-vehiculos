// CRUD USUARIOS
    var conexion = null;
    module.exports.addConexion = (con)=>{
        conexion = con;
    } 
    // CREATE    USUARIO
    module.exports.CrearUsuario = (USUARIO, PASSWORD, ROL, CEDULA, callback)=>{
        if(conexion == null){ 
            throw new Error("La variable de Conexion no ha sido definida");
        }else{
            conexion.query("INSERT INTO `heroku_d887aadfd8b0128`.`usuario` (`USUARIO`, `PASSWORD`, `ROL`, `CEDULA`) VALUES ( ? , ? , ? , ? );",[USUARIO, PASSWORD, ROL, CEDULA], callback);
        }
    }
    // READ      USUARIO
    module.exports.LeerUsuario = (ID , callback)=>{
        if(conexion == null){ 
            throw new Error("La variable de Conexion no ha sido definida");
        }else{
            conexion.query("SELECT * FROM heroku_d887aadfd8b0128.usuario WHERE (`id`= ? );",[ID],callback);
        }
    }
    // UPDATE    USUARIO
    module.exports.ActualizarUsuario = (ID,USUARIO, PASSWORD, ROL, CEDULA, callback)=>{
        if(conexion == null){ 
            throw new Error("La variable de Conexion no ha sido definida");
        }else{
            var variables = [];
            var query = "UPDATE `heroku_d887aadfd8b0128`.`usuario` SET ";
            if(USUARIO   != null){ variables.push(USUARIO);   query += "`USUARIO`=?,";  }
            if(PASSWORD  != null){ variables.push(PASSWORD);  query += "`PASSWORD`=?,"; }
            if(ROL != null){       variables.push(ROL); query += "`ROL`=?,";}
            if(CEDULA    != null){ variables.push(CEDULA);    query += "`CEDULA`=?";   }
            variables.push(ID);
            query += " WHERE (`id` = ?);";
            conexion.query(query,variables,callback);
        }
    }
    // DELETE    USUARIO
    module.exports.EliminarUsuario = (ID,callback)=>{
        if(conexion == null){ 
            throw new Error("La variable de Conexion no ha sido definida");
        }else{
            conexion.query("DELETE FROM `heroku_d887aadfd8b0128`.`usuario` WHERE (`id` = ?);",[ID],callback);
        }
    }
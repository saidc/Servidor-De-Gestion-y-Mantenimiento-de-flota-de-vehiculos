// CRUD USUARIOS
    var query = (query_str,input,callback)=>{
        throw new Error("La variable de query no ha sido definida");
    };
    
    module.exports.addQuery = (que)=>{
        query = que;
    }

    // CREATE    USUARIO
    module.exports.CrearUsuario = async(USUARIO, PASSWORD, ROL, CEDULA, callback)=>{
        await query("INSERT INTO `heroku_d887aadfd8b0128`.`usuario` (`USUARIO`, `PASSWORD`, `ROL`, `CEDULA`) VALUES ( ? , ? , ? , ? );",[USUARIO, PASSWORD, ROL, CEDULA], callback);
    }
    
    // READ      USUARIO
    module.exports.LeerUsuario = async (ID , callback)=>{
        await query("SELECT id,USUARIO,ROL,CEDULA FROM heroku_d887aadfd8b0128.usuario WHERE (`id`= ? );",[ID],callback);
    }
    
    module.exports.getNumberOfUsuarios = async ( callback)=>{
        await query("SELECT COUNT(*) as NumRow  FROM heroku_d887aadfd8b0128.usuario;",[],callback);
    }
    module.exports.getUsuariosPosNoRows = async ( PosicionFila ,NoFilas,callback)=>{
        await query("SELECT id,USUARIO,ROL,CEDULA FROM heroku_d887aadfd8b0128.usuario LIMIT ?,?;",[PosicionFila,NoFilas],callback);
    }
    // UPDATE    USUARIO
    module.exports.ActualizarUsuario = async (ID,USUARIO, PASSWORD, ROL, CEDULA, callback)=>{
        var variables = [];
        var query = "UPDATE `heroku_d887aadfd8b0128`.`usuario` SET ";
        if(USUARIO   != null){ variables.push(USUARIO);   query += "`USUARIO`=?,";  }
        if(PASSWORD  != null){ variables.push(PASSWORD);  query += "`PASSWORD`=?,"; }
        if(ROL != null){       variables.push(ROL); query += "`ROL`=?,";}
        if(CEDULA    != null){ variables.push(CEDULA);    query += "`CEDULA`=?";   }
        variables.push(ID);
        query += " WHERE (`id` = ?);";
        await query(query,variables,callback);
    }
    // DELETE    USUARIO
    module.exports.EliminarUsuario = async (ID,callback)=>{
        await query("DELETE FROM `heroku_d887aadfd8b0128`.`usuario` WHERE (`id` = ?);",[ID],callback);
    }
    
    //  Get ID de USUARIO
    module.exports.GetID_USUARIO = async (usuario,callback)=>{
        await query("SELECT id FROM heroku_d887aadfd8b0128.usuario WHERE ( USUARIO = ? );",[usuario],callback);
    }
    
    //  Get user by USUARIO
    module.exports.GetUser_by_USUARIO = async (usuario,callback)=>{
        await query("SELECT * FROM heroku_d887aadfd8b0128.usuario WHERE ( USUARIO = ? );",[usuario],callback);
    }


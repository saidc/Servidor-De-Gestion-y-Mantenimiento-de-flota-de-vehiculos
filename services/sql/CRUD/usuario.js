// CRUD USUARIOS
    var query = (query_str,input,callback)=>{
        throw new Error("La variable de query no ha sido definida");
    };
    
    module.exports.addQuery = (que)=>{
        query = que;
    }

    // CREATE    USUARIO
    module.exports.CrearUsuario = async(NOMBRE, APELLIDO, CORREO, PASSWORD, ROL, GENERO, CEDULA, TARJETA, callback)=>{
        await query("INSERT INTO `123databasename321`.`usuario` (`NOMBRE`,`APELLIDO`,`CORREO`, `PASSWORD`, `ROL`,`GENERO`, `CEDULA`,`TARJETA`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? );",[NOMBRE, APELLIDO, CORREO, PASSWORD, ROL, GENERO, CEDULA, TARJETA], callback);
    }
    
    // READ      USUARIO
    module.exports.getUsuarios = async ( callback)=>{
        await query("SELECT * FROM 123databasename321.`usuario` ;",[],callback);
    }
    
    module.exports.getNumberOfUsuarios = async ( callback)=>{
        await query("SELECT COUNT(*) as NumRow  FROM 123databasename321.usuario;",[],callback);
    }
    module.exports.getUsuariosPosNoRows = async ( PosicionFila ,NoFilas,callback)=>{
        await query("SELECT id,NOMBRE,APELLIDO,CORREO,ROL,CEDULA,GENERO,TARJETA,PASSWORD FROM 123databasename321.`usuario` LIMIT ?,?;",[PosicionFila,NoFilas],callback);
    }
    // UPDATE    USUARIO
    module.exports.ActualizarUsuario = async (ID, NOMBRE, APELLIDO, CORREO, PASSWORD, ROL, GENERO, CEDULA, TARJETA, callback)=>{
        var variables = [];
        var query_str = "UPDATE `123databasename321`.`usuario` SET ";
        if(CORREO   != null && CORREO != ""){ variables.push(CORREO);   query_str += "`CORREO`=?,";  }
        if(PASSWORD  != null && PASSWORD != ""){ variables.push(PASSWORD);  query_str += "`PASSWORD`=?,"; }
        if(ROL != null && ROL != ""){       variables.push(ROL); query_str += "`ROL`=?,";}
        if(CEDULA    != null && CEDULA != ""){ variables.push(CEDULA);    query_str += "`CEDULA`=?,";   }
        if(NOMBRE    != null && NOMBRE != ""){ variables.push(NOMBRE);    query_str += "`NOMBRE`=?,";   }
        if(APELLIDO  != null && APELLIDO != ""){ variables.push(APELLIDO);  query_str += "`APELLIDO`=?,"; }
        if(GENERO    != null && GENERO != ""){ variables.push(GENERO);    query_str += "`GENERO`=?,";   }
        if(TARJETA   != null && TARJETA != ""){ variables.push(TARJETA);   query_str += "`TARJETA`=?,";  }
        query_str = removechar( query_str, query_str.length -1 )
        variables.push(ID);
        query_str += " WHERE (`id` = ?);";
        await query(query_str,variables,callback);
    }
    // DELETE    USUARIO
    module.exports.EliminarUsuario = async (ID,callback)=>{
        await query("DELETE FROM `123databasename321`.`usuario` WHERE (`id` = ?);",[ID],callback);
    }
    
    //  Get ID de USUARIO
    module.exports.GetID_USUARIO = async (CORREO,callback)=>{
        await query("SELECT id FROM 123databasename321.`usuario` WHERE ( CORREO = ? );",[CORREO],callback);
    }
    
    //  Get user by USUARIO
    module.exports.GetUser_by_USUARIO = async (CORREO,callback)=>{
        await query("SELECT * FROM 123databasename321.`usuario` WHERE ( CORREO = ? );",[CORREO],callback);
    }

    //  GetColums names
    module.exports.GetColumnsNames = async (callback)=>{
        await query("SHOW COLUMNS FROM 123databasename321.`usuario` ;",[],callback);
    }

    var removechar=(str,pos)=>{ return ( pos >= str.length || pos < 0 || str.length == 0)? (str): (pos == 0)? (str.slice(1)): (pos == str.length -1 )? (str.slice(0,pos)) :(str.slice(0,pos)+str.slice(pos+1)) }
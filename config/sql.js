require('dotenv').config();

module.exports={
    host:       process.env.DB_HOST,
    posrt:      process.env.DB_PORT,
    database:   process.env.DB_DATABASE,
    user:       process.env.DB_USER,
    password:   process.env.DB_PASWORD
}

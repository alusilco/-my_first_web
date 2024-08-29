const mysql = require("mysql")
const { resolveHostname } = require("nodemailer/lib/shared")
const util = require("util")

const pool = mysql.createPool({
    connectionLimit: 10, 
    host: "localhost",
    database: "flowers",
    user: "root",
    password: ""
})

pool.getConnection((err, connection) => {
    if(err) {
        console.warn("No se pudo establecer la conexión", {error: err.message})

    } else {
        console.log("Conexión con la base de datos exitosa...")
    }
})

pool.query = util.promisify(pool.query)


module.exports = pool
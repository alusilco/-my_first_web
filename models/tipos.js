const pool = require("../db")

const agregarTipos = async (tipo) => {
    try {
        const query = `INSERT INTO tipos SET ${tipo}`
        const row = await pool.query(query)
        return row

    } catch (error) {
        console.log(error)
    }
}

async function leerTipos() {
    try {
        const query = "SELECT * FROM tipos";
        const rows = await pool.query(query);
        return rows
    } catch (error) {
        console.log(error)
    }
}

async function leerTipos(id) {
    try {
        const query = `DELETE * FROM tipos WHERE id = ${id} LIMIT 1`
        const row = await pool.query(query)
        return row
    } catch (error) {
        console.log(error)        
    }
}

const borrarTipos = async(id) => {
    try {
        const query = `SELECT * FROM tipos WHERE id = ${id}`
        const row = await pool.query(query)
        return row
    } catch (error) {
        
    }
}

module.exports = {agregarTipos, leerTipos, leerTipos, borrarTipos }
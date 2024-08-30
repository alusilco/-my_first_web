const pool = require("../db")

const agregarTipo = async (tipo) => {
    try {
        const query = "INSERT INTO tipo SET ${tipo}"
        const row = await pool.query(query)
        return row

    } catch (error) {
        console.log(error)
    }
}

module.exports = {agregarTipo}
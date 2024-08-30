const pool = require("../db")
const md5 = require ("md5")

const getUser = async (email, pass) => {
    const query = "SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1"
    const row = await pool.query(query, [email, md5(pass)])
    return row [0]
}

module.exports = { getUser }


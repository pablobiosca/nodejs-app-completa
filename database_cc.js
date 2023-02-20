const mysql = require("mysql2/promise")
// require("dotenv").config()

const { database,database_cc } = require("./keys")

let db_utilizable

console.log(database_cc)

console.log("xxxxx = ",process.env.NODE_ENV)

if (process.env.NODE_ENV=="production"){
    db_utilizable = database_cc
}else{
    db_utilizable = database
}

console.log(db_utilizable)

const pool = mysql.createPool(db_utilizable)


//pruebas
// let consulta = async ()=>{
//     let [consulton] = await pool.query("show tables;")

//     console.log(consulton)
// }

// consulta()

module.exports = pool
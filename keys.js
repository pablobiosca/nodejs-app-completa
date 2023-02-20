require("dotenv").config()

module.exports = {
    database:{
        host:"localhost",
        user:"root",
        password:"1234",
        database:"database_links"
    },
    database_cc:{
        host:process.env.PPP_MYSQL_HOST,
        user:process.env.PPP_MYSQL_USERNAME,
        password:process.env.PPP_MYSQL_PASSWORD,
        database:process.env.PPP_MYSQL_DATABASE
    }
}
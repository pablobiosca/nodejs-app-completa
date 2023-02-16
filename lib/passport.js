const passport = require("passport")
const localstrategy = require("passport-local").Strategy

const pool = require("../database")
const helpers = require("../lib/helpers")

//nombre de autentificacion
passport.use("local.signup", new localstrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback:true
    //propagar el req

}, async (req,username,password,done)=>{
    console.log(req.body)

    const {email,fullname} = req.body
    const new_user = {
        username,
        password,
        email,
        fullname
    }

    new_user.password = await helpers.encryptpassword(password)

    const [result] = await pool.query("insert into users set ?",[new_user])

    console.log(result.insertId)

    new_user.id = result.insertId

    return done(null, new_user)
}))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async(id,done) =>{
    const [rows] = await pool.query("select * from users where id_user = ?",[id])

    done(null,rows[0])
} )

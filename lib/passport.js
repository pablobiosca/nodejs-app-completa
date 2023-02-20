const passport = require("passport")
const localstrategy = require("passport-local").Strategy

const pool = require("../database_cc")
const helpers = require("../lib/helpers")

//estrategia de login
passport.use("local.signin", new localstrategy({
    usernameField:"username",
    passwordField:"password",
    passReqToCallback:true
},async (req,username,password,done) => {
    const [rows] = await pool.query("select * from users where username = ?",[username])

    if (rows.length>0){
        console.log(rows[0])
        console.log(username,password)
        const user = rows[0]
        const validpassword = await helpers.matchpassword(password,user.password)
        if(validpassword){
            console.log("ta bien")
            done(null,user,req.flash("message","welcome back"))
        }else{
            done(null,false,req.flash("message","Incorrect password !"))
        }
    }else{
        return done(null,false,req.flash("message","username does not exists"))
    }
}))


//estrategia de resgistro
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

    new_user.id_user = result.insertId

    return done(null, new_user)
}))

passport.serializeUser((x,done)=>{
    console.log("serial")
    done(null,x.id_user)
})

passport.deserializeUser(async(id,done) =>{

    const [rows] = await pool.query("select * from users where id_user = ?",[id])
    console.log(rows[0])
    console.log(rows)
    done(null,rows[0])
} )

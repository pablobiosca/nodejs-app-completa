const passport = require("passport")
const localstrategy = require("passport-local").Strategy

//nombre de autentificacion
passport.use("local.signup", new localstrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback:true
}, async (req,username,password,done)=>{
    console.log(req.body)
}))
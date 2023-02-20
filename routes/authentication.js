const express = require('express');
const router = express.Router();
const passport = require("passport")
const {isloggedin,isnotelogged} = require("../lib/auth")

/* GET users listing. */
router.get('/signup', isnotelogged , function(req, res, next) {
  res.render("auth/signup")
});

router.post('/signup', isnotelogged , passport.authenticate("local.signup",  {
    successRedirect:"/profile",
    failureRedirect:"/signup",
    failureFlash:true
}))

router.get("/signin",isnotelogged,(req,res)=>{
  res.render("auth/signin")
})

router.post("/signin",isnotelogged,(req,res,next)=>{
  passport.authenticate("local.signin",{
    successRedirect:"/profile",
    failureRedirect:"/signin",
    failureFlash:true
  })
  
  (req,res,next)

})

router.get("/profile", isloggedin, (req,res)=>{
  res.render("profile")
})

router.get("/logout", isloggedin ,(req,res) =>{
  req.logOut( function(err){
    if(err){
      return next(err)
    }
  })
  res.redirect("/signin")
})

module.exports = router;

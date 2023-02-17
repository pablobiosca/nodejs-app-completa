module.exports = {

    isloggedin( req,res,next ){
        if (req.isAuthenticated()){
            return next()
        }

        return res.redirect("signin")
    },

    isnotelogged(req,res,next){
        if (!req.isAuthenticated()){
            return next()
        }
        return res.redirect("/profile")
    }

}
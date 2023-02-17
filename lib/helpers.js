const bcrypt = require("bcryptjs")

const helpers = {}

helpers.encryptpassword = async (password) => {

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    return hash

}

helpers.matchpassword = async (password,saved_password) => {
    try{
        return await bcrypt.compare(password,saved_password)
    }catch (error){
        console.log(error)
    }
}

module.exports = helpers
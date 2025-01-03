const bcrypt = require("bcryptjs");

const generateSalt = async()=>{
    return await bcrypt.genSalt(10);
}

const hashPassword = async(userPassword,salt)=>{
    return await bcrypt.hash(userPassword,salt);
}


const isMatch = async(plainPassword, hashedPassword)=>{
    return await bcrypt.compare(plainPassword, hashedPassword)
}

module.exports = {
    generateSalt,
    hashPassword,
    isMatch
}


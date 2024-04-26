const JWT = require("jsonwebtoken");

const generateAccessToken = (user)=>{
    return JWT.sign({name:user.name, ...user}, process.env.JWT_ACCESS_TOKEN, {expiresIn : "1w"})
}

const generateRefreshToken = (user)=>{
    return JWT.sign({name:user.name, ...user}, process.env.JWT_REFRESH_TOKEN)
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}
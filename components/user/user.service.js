const UserDal = require("./user.dal")
const {generateAccessToken, generateRefreshToken} = require("./user.auth")


class UserService {

    constructor() {
        this.userDAL = new UserDAL()
       
    }

    // Daha sonra yazılacaktır.

    findById(id) {
        const user = this.userDAL.findbyId(id);
        return user;
    }
    accessToken(loginUser){
        return generateAccessToken()
    }
    refreshToken(loginUser){
        return generateRefreshToken()
    }
}

module.exports = UserService
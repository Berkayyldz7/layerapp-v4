const UserDAL = require("./user.dal")
const UserService = require("./user.service")

const UserModel = require("./user.model")
const { generateAccessToken, generateRefreshToken } = require("./user.auth")



const postUser = async(req,res)=>{
    try {
        const {name, password} = req.body
        const users = await new UserDAL({name,password}).createUser()
        res.status(201).send({users})
        
    } catch (error) {
        res.status(500).send({"msg":error})
        console.log("anaskm")
    }
}


const getUser = async (req,res)=>{
    const users = new UserDAL()
    const user = await users.getAllData()
    res.status(200).send({user})
}

const loginUser = async (req,res)=>{
try {
    const {name,password} = req.body
    const loginUser = await new UserDAL({name,password}).getOneUser() 
    console.log(loginUser)
    if(!loginUser){
        return res.status(400).send({msg:"invalid password or username."})
    }
    // JWT Operations - 
    const signedUsers = {
        ...loginUser.toObject(), // Çok önemli mongodb'den gelen bir data aldığımız için bunu yapmazsak çalışmaz.
        tokens : {
            // access_token : new UserService().accessToken(loginUser),
            // refresh_token : new UserService().refreshToken(loginUser)
            access_token : generateAccessToken(loginUser),
            refresh_token : generateRefreshToken(loginUser)
        }
    }
    // delete loginUser.password
    console.log("tokenized_user:", signedUsers)
    res.status(200).send({loginUser})
} catch (error) {
    res.status(500).send({msg:"An error has come about at userLogin controller."})
}

}

module.exports = {
    getUser,
    postUser,
    loginUser
}


// export default class UserController {
//     constructor() {
//         this.userService = new UserService();
//     }
//    async getUser (req,res) {
//         try {
//             const {id} = req.param;
//             return this.userService.findById(id);
//         } catch (error) {
//             res.status(500).send({"msg":error})
//         }
//     }
       
// }



// const postUsers = async (req,res)=>{
//     try {
//         const {name} = req.body
//         console.log({name})
//         const users =  await UserModel.create({name})
//         res.status(201).send({users})
//     } catch (error) {
//         res.status(500).send({"msg":error})
//         console.log("anaskm")
//     }
// }


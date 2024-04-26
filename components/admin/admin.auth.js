const JWT = require("jsonwebtoken");

// const accessAdminToken = (req,res,next)=>{
//     const authHeader = req.headers["authorization"]
//     const authToken = authHeader?.split(" ")[1]
//     if(authToken === null){
//         return res.status(400).send({msg:"the token is unvalid. Please login by being admin."})
//     }
//     JWT.verify(authToken, process.env.JWT_ACcESS_TOKEN, (err,user)=>{
//         if(err){
//             return res.status(400).send({"msg":"The token invalid or can not been no more used."})
//         }
//         req.user = user
//         console.log(user, "an error has occured admin.auth middleware")
//         next()
//     })
// }

// module.exports = accessAdminToken

const accessAdminToken = (req,res,next)=>{
    const autHeader = req.headers["authorization"];
    const authToken = autHeader?.split(" ")[1];
    if(authToken === null){
        return res.status(400).send({msg:"Unauthorizated token please login first by being admin."})
    }

    JWT.verify(authToken, process.env.JWT_ACCESS_TOKEN, (err,user)=>{
        if(err){
            return res.status(400).send({err:"The token invalid or can not been no more used."})
        }
        req.user = user
        console.log("user =",user)
        console.log("req.body=", req.body)
        if(user.name==="admin" && user._doc.password === '2ea8ffd885253cbdfa66f7c67822c7ba277189fa'){
            next();
        }else{
            return res.status(400).send({msg:"If you want to carry on this process you have to be an admin."})
        }
    })
}

module.exports = accessAdminToken
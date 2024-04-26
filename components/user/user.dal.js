const { passwordToHash } = require("./user.crypto")
const UserModel = require("./user.model")


class UserDAL {
    constructor(usersData){
        this.usersData = usersData
        // usersData; req.body'e eşittir.

    }

    async getAllData(where){
        try {
        //    const user = await UserModel.find({})
        //    return user
            return UserModel.find(where)
        } catch (error) {
            console.log("An error has come about at user.dal.js Line 9")
            throw error
        }
    }
    getOneUser(where){
        // if("berkay" === this.usersData.name){ // Koşul yazmaya şu aşamada ihtiyaç yok ama admin kontrolü için var
        //     return UserModel.findOne({name:"berkay"})
        // }
        const userDataName = this.usersData.name
        const userDataPassword = passwordToHash(this.usersData.password) // db'ye kayıt açılırken parolayı hash'lediğimiz için burdaka şayet hash'leme yapmazsak arattığımız parolayla eşleşmez.
        return UserModel.findOne({name:userDataName, password:userDataPassword})
        
    }
    createUser(){
        try {
            const name = this.usersData.name
            const password = passwordToHash(this.usersData.password)
            // const pasword = this.userPassword
            const createdUser = UserModel.create({name,password})
            console.log(name,password)
            return createdUser
        } catch (error) {
            console.log("An error has come about at user.dal.js Line 18")
            throw error
        }
    }
}

module.exports = UserDAL
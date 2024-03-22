const BaseService = require('./baseService')

class AuthService extends BaseService{
    generateCode=()=>{
       return  Math.floor((Math.random() * 100000) + 1);
    }
    sendSMS=(phoneNumber,Code)=>{
        //ToDo کار با کاوه نگار
        return true
    }
}

module.exports = AuthService
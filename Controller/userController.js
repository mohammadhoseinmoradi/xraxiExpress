const BaseController = require ("./BaseController")
const userDatabaseModel = require ('../Database/user')
class userController extends  BaseController{
#database
    constructor() {
        super();
        this.#database = userDatabaseModel
    }
    create = (req,res)=>{

    }
}

module.exports = new userController()
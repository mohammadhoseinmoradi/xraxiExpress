const DatabaseInterface = require("../Utitlity/DatabaseInteface");

class BaseService {
  #database;
  constructor() {
    this.#database = new DatabaseInterface();
  }
  readByParameter = async (database, query, option) => {
    try {
      let QueryDatabase = await this.#database.get(database, query, option);

      return QueryDatabase;
    } catch (error) {
      throw error;
    }
  };
  readAll = () => {
    return "salam mohammad";
  };
  updateOne = () => {};
  updateMany = () => {};
  deleteOne = () => {};
  deleteMany = () => {};
  validationModel = () => {};
  create = async (database, dataModel) => {
    try {
      console.log(database, dataModel);
      let QueryDatabase = await this.#database.create(database, dataModel);

      return this.objectResponse(QueryDatabase);
    } catch (e) {
      throw e;
    }
  };
  objectResponse = async (response) => {
    return {
      Data: { data: response },
      Meta: { errorMassage: "", status: 200 },
    };
  };
}

module.exports = BaseService;

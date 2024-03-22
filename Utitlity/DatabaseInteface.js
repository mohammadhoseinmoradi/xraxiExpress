class DatabaseInterface {
  create = async (database, data) => {
    try {
      const newData = new database(data);
      console.log(newData);
      return await newData.save();
    } catch (error) {
      throw error;
    }
  };
  get = async (database, query, option) => {
    try {
      return await database.find({ $and: [query] }, option);
    } catch (error) {
      throw error;
    }
  };
  updateOne = async (database, query, newData) => {
    try {
      return await database.findOneAndUpdate(query, newData);
    } catch (error) {
      throw error;
    }
  };
  updateMany = async (database, query, newData) => {
    try {
      return await database.updateMany(query, newData);
    } catch (error) {
      throw error;
    }
  };
  deleteOne = async (database, query) => {
    try {
      return await database.findOneAndDelete(query);
    } catch (error) {
      throw error;
    }
  };
  deleteMany = async (database, query) => {
    try {
      return await database.deleteMany(query);
    } catch (error) {
      throw error;
    }
  };
  checkExist = async (data) => {
    try {
      if (data[0]) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  };
  count = async (database, query) => {
    try {
      return await database.count({ $and: [query] });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = DatabaseInterface;

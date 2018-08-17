const mongoose = require("mongoose");
const createUser = require("../user/repository");

class MongoRepository {
  constructor() {
    this.mongoose = mongoose;
    this.mongoose.connect(process.env.mongo_connection);
    this.User = createUser(this.mongoose);
  }
}

module.exports = new MongoRepository();

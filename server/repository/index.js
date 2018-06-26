const mongoose = require("mongoose");
const createUser = require("../user/repository");

class MongoRepository {
  constructor() {
    this.mongoose = mongoose;
    this.mongoose.connect(
      "mongodb://admin:builder123@ds016058.mlab.com:16058/resume-builder-db"
    );
    this.User = createUser(this.mongoose);
  }
}

module.exports = new MongoRepository();

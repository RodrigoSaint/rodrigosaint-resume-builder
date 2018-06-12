import mongoose from "mongoose";
import createUser from "../user/repository";

class MongoRepository {
  constructor() {
    this.mongoose = mongoose;
    this.mongoose.connect(
      "mongodb://admin:builder123@ds016058.mlab.com:16058/resume-builder-db"
    );
  }

  get User() {
    return createUser(this.mongoose);
  }
}

export default new MongoRepository();

const { Schema } = require("mongoose");

const userSchema = new Schema({
  nameOnUrl: { type: String, unique: true },
  name: String,
  tagLine: String,
  profilePicture: String,
  githubUsernameCollection: [String],
  wordpressUrlCollection: [String]
});

module.exports = mongoose => mongoose.model("userCollection", userSchema);

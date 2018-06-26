const { Schema } = require("mongoose");

const userSchema = new Schema({
  nameOnUrl: { type: String, unique: true },
  name: String,
  tagLine: String,
  profilePicture: String,
  githubUsernameCollection: [String],
  wordpressUrlCollection: [String]
});

userSchema.statics.getUserSummary = function(id) {
  return this.model("userCollection")
    .findById(id, {
      "profile.summary": true
    })
    .then(user => user.profile.summary);
};

userSchema.statics.getUserTopSkills = function(id) {
  return this.model("userCollection")
    .findById(id, {
      "profile.skills": true
    })
    .then(user => user.profile.skills);
};

userSchema.statics.getUserPositions = function(id) {
  return this.model("userCollection")
    .findById(id, {
      "profile.positions": true
    })
    .then(user => user.profile.positions);
};

module.exports = mongoose => mongoose.model("userCollection", userSchema);

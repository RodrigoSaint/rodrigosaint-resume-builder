import { Schema, model } from "mongoose";

const userSchema = new Schema({
  nameOnUrl: { type: String, unique: true },
  name: String,
  profilePicture: String,
  githubUsernameCollection: [String],
  wordpressUrlCollection: [String]
});

export default mongoose => mongoose.model("userCollection", userSchema);

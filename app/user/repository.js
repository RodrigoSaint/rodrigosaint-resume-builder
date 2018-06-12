import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  profilePicture: String,
  githubUsernameCollection: [String],
  wordpressUrlCollection: [String]
});

export default mongoose => mongoose.model("userCollection", userSchema);

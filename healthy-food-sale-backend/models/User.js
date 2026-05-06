import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: "admin" },
});

export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // stored hashed
  role: { type: String, enum: ["Admin", "Teacher", "Student"], default: "Student" }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

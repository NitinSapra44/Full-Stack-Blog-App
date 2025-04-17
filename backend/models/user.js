import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SaltRound = 10;
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, SaltRound);
  next();
});

export { UserSchema };

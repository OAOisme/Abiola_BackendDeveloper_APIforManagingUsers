import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", function (next) {
  const user = this as IUser;
  user.email = user.email.toLowerCase();
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

export default model<IUser>("User", userSchema);

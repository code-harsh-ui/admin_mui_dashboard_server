import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 100,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      // enum is used when we want only particular predefined values like user can choose only these predefined values not anything else. This is case sensitive to prevent this we can use uppercase or lowercase to match the predefined values for the field
      enum: ["user", "admin", "superadmin"],
      default: "admin",
    },
  },
  // for created date or updated date
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

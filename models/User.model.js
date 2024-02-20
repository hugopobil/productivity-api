const mongoose = require("mongoose");

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "The name is required"],
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "The email is required"],
      unique: true,
      match: [EMAIL_REGEX, "The email format is invalid"],
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "The password is required"],
      minlength: [8, "The password must have at least 8 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); 

const ROUNDS = 10;

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema(
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

//Metodo para comparat las passwords

userSchema.methods.checkPassword = function (passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
};

//PreSave de la password hasheada

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, ROUNDS)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

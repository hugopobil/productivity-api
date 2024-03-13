const User = require("../models/User.model");
const Like = require("../models/Like.model");
const { StatusCodes } = require("http-status-codes");
const { transporter, createEmailTemplate } = require('../Config/nodemailer.config');

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
};


module.exports.createUser = (req, res, next) => {
  const userToCreate = {
    ...req.body,
  };

  if (req.file) {
    userToCreate.image = req.file.path;
  }

  User.findOne({
    $or: [{ username: userToCreate.username }, { email: userToCreate.email }],
  })
    .then((user) => {
      if (user) {
        throw new Error("User already exists");
      } else {
        return User.create({
          ...userToCreate,
        });
      }
    })
    .then((newUser) => {
      transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: newUser.email,
        subject: 'Achieve It - Vaidation E-mail ✉️',
        html: createEmailTemplate(newUser),
      });

      res.status(201).json(newUser);
    })
    .catch(next);
};

const getUser = (id, req, res, next) => {
  User.findById(id)
    .populate({
      path: "likes",
      populate: {
        path: "post",
      }
    })
    .then((user) => {
      res.json(user);
    })
    .catch(next);
};

module.exports.getUserFromPost = (req, res, next) => {
  const { userId } = req.params;
  getUser(userId, req, res, next);
};

module.exports.getCurrentUser = (req, res, next) => {
  console.log(req.currentUserId);
  getUser(req.currentUserId, req, res, next);
};

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;
  getUser(id ? id : req.params.id, req, res, next);
};

module.exports.activate = (req, res, next) => {
  const { token } = req.params;
  User.findOneAndUpdate({ activationToken: token }, { isActive: true }, { new: true })
    .then((dbUser) => {
      res.status(200).json({ message: "Account activated successfully", email: dbUser.email });
    })
    .catch((error) => next(error));
};

module.exports.editUser = (req, res, next) => {
  const { userId } = req.params.id;
  const updatedUserData = req.body;

  User.findByIdAndUpdate(userId, updatedUserData, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    })
    .catch(next);
};
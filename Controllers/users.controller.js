const User = require("../models/User.model");
const Like = require("../models/Like.model");
const { StatusCodes } = require("http-status-codes");

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
    userToCreate.image = req.file.path
  }

  User.findOne({
    $or: [{ username: userToCreate.username }, { email: userToCreate.email }],
  })
    .then((user) => {
      if (user) {
        throw new Error("User already exists");
      } else {
        return User.create(userToCreate);
      }
    })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
};

const getUser = (id, req, res, next) => {
  User.findById(id)
    .populate({
      path: "likes",
      populate: {
        path: "post",
      },
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

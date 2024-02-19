const User = require("../models/User.model");
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
  }

  User.findOne( { $or: [ { username: userToCreate.username }, { email: userToCreate.email }]})
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




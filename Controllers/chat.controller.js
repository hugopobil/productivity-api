const Chat = require("../models/Chat.model");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");

module.exports.getChats = async (req, res, next) => {
  Chat.find()
    .populate("messages")
    .populate("user_1")
    .populate("user_2")
    .exec()
    .then((chats) => {
      res.status(200).json(chats);
    })
    .catch(next);
};

module.exports.createChat = async (req, res, next) => {
  const chatToCreate = {
    ...req.body,
  };

  Chat.create(chatToCreate)
    .then((chat) => {
      res.status(201).json(chat);
    })
    .catch(next);
};

module.exports.getChat = async (req, res, next) => {
  const { id } = req.params;

  Chat.findById(id)
    .populate("messages")
    .populate("user_1")
    .populate("user_2")
    .exec()
    .then((chat) => {
      if (!chat) {
        throw createError(
          StatusCodes.NOT_FOUND,
          `Chat with id ${id} not found`
        );
      }
      res.status(200).json(chat);
    })
    .catch(next);
};

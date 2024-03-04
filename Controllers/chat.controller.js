const Chat = require("../models/Chat.model");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");


module.exports.createChat = async (req, res, next) => {
  const { userId } = req.params;

  const chatToCreate = {
    users: [userId, req.currentUserId]
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
    .populate("users")
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

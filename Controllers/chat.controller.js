const Chat = require("../models/Chat.model");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const Message = require("../models/Message.model");


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
  const { chatId } = req.params;

  console.log(chatId)

  Chat.findById(chatId)
    .populate("messages")
    .populate("users")
    .then((chat) => {
      console.log(chat)
      if (!chat) {
        throw createError(
          StatusCodes.NOT_FOUND,
          `Chat with id ${chatId} not found`
        );
      }
      res.status(200).json(chat);
    })
    .catch(next);
};

module.exports.allChats = (req, res, next) => {
  Chat.find({ users: { $in: [req.currentUserId] } })
    .then(chats => {
      res.json(chats)
    })
}; 

module.exports.deleteChat = (req, res, next) => {
  const { chatId } = req.params;

  Chat.findByIdAndDelete(chatId)
    .then((chat) => {
      if (!chat) {
        throw createError(
          StatusCodes.NOT_FOUND,
          `Comment with id ${chatId} not found`
        );
      }
      res.status(204).send();
    })
    .catch(next);
}
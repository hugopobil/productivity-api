const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const Message = require("../models/Message.model");
const Chat = require('../models/Chat.model')

exports.getMessageById = async (req, res) => {
    try {
      const messageId = req.params.id;
      const message = await Message.findById(messageId);
      
      if (!message) {
        throw createError(StatusCodes.NOT_FOUND, "Message not found");
      }
      
      res.json(message);
    } catch (error) {
      if (error instanceof createError.HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
      }
    }
};
  

exports.createMessage = async (req, res) => {
  const { content } = req.body;
  const { chatId } = req.params;
  const userId = req.currentUserId;

  const message = new Message({ content, user: userId, chatId });
    console.log('ntrooooo')
  try {
    const newMessage = await message.save();
    res.status(StatusCodes.CREATED).json(newMessage);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      throw createError(StatusCodes.NOT_FOUND, "Message not found");
    }
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    if (error instanceof createError.HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
};

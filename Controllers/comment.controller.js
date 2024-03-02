const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");

const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");

module.exports.getComments = async (req, res, next) => {
  Comment.find()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch(next);
};

module.exports.commentPost = (req, res, next) => {
  const { postId } = req.params;
  const { content } = req.body;
  const { user } = req.body;

    const commentToCreate = {
        content: content,
        post: postId,
        user: user
    };

    Post.findById(postId)
        .then((post) => {
            if (!post) {
                throw createError(StatusCodes.NOT_FOUND, `Post with id ${postId} not found`);
            } else {
                return Comment.create(commentToCreate);
            }
        })
        .then((comment) => {
            res.status(201).json(comment);
        })
        .catch(next);
};

module.exports.deleteComment = (req, res, next) => {
  const { commentId } = req.params;

  Comment.findByIdAndDelete(commentId)
    .then((comment) => {
      if (!comment) {
        throw createError(
          StatusCodes.NOT_FOUND,
          `Comment with id ${commentId} not found`
        );
      }
      res.status(204).send();
    })
    .catch(next);
}

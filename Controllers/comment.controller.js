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

    const commentToCreate = {
        content: content,
        post: postId,
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

// module.exports.createComment = async (req, res, next) => {
//     const commentToCreate = {
//         ...req.body,
//     };

//     Comment.create(commentToCreate)
//         .then((comment) => {
//             res.status(201).json(comment);
//         })
//         .catch(next);
// }

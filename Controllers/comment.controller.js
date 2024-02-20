const Comment = require('./models/comment.model');

const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');

module.exports.getComments = async (req, res, next) => {
    Comment.find()
        .then((comments) => {
            res.status(200).json(comments);
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

const Post = require("../models/Post.model");

const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");

module.exports.getPosts = (req, res, next) => {
  Post.find()
    // .populate("comments")
    .populate("user")
    // .exec()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next);
};

module.exports.createPost = (req, res, next) => {
  const postToCreate = {
    ...req.body,
  };

  Post.create(postToCreate)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(next);
};

module.exports.getPost = (req, res, next) => {
  const { id } = req.params;

  Post.findById(id)
    .then((post) => {
      if (!post) {
        throw createError(
          StatusCodes.NOT_FOUND,
          `Post with id ${id} not found`
        );
      }
      res.status(200).json(post);
    })
    .catch(next);
};

module.exports.updatePost = (req, res, next) => {
  const { id } = req.params;
  const postToUpdate = {
    ...req.body, 
  };

  Post.findByIdAndUpdate(id, postToUpdate, { new: false })
    .then((post) => {
      if (!post) {
        throw createError(
          StatusCodes.NOT_FOUND,
          `Post with id ${id} not found`
        );
      }
      res.status(200).json(post);
    })
    .catch(next);
};

// module.exports.displayPosts = (req, res, next) => {
//   return Post.find()
//     .populate("comments")
//     .exec()
//     .then((posts) => {
//       posts.forEach((post) => {
//         console.log(`Post: ${post.title}`);
//         console.log("Comments:");
//         post.comments.forEach((comment) => {
//           console.log(comment.text);
//         });
//         console.log("------------------------");
//       });
//       res.status(200).json(posts);
//     })
//     .catch((err) => {
//       console.error("Error fetching posts:", err);
//     });
// };

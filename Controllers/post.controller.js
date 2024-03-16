const Post = require("../models/Post.model");
const Like = require("../models/Like.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");


module.exports.getPosts = (req, res, next) => {
  Post.find()
    .populate("user")
    .populate({
      path: "likes",
      populate: {
        path: "user",
      },
    })
    .populate({
      path: "comments",
      populate: {
        path: "post",
      },
      populate: {
        path: "user",
      }
    })
    // .exec()
    .then((posts) => {
      console.log(posts.title)
      res.status(200).json(posts);
    })
    .catch(next);
};


module.exports.likePost = (req, res, next) => {
  Like.findOne({ user: req.currentUserId, post: req.params.postId })
    .then((like) => {
      if (like) {
        Like.deleteOne({user: req.currentUserId, post: req.params.postId})
          .then(() => {
            res.json('like removed')
          })
      } else {
        Like.create({user: req.currentUserId, post: req.params.postId})
          .then(() => {
            res.json('like added')
          })
      }
    })
};


module.exports.createPost = (req, res, next) => {
  const postToCreate = {
    ...req.body,
    image: req.file.path
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

  if (req.file) {
    postToUpdate.image = req.file.path;
  }

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

module.exports.getPostsByUser = (req, res, next) => {
  const { userId } = req.params;

  Post.find({ user: userId })
  .populate({
    path: "comments",
    populate: {
      path: "post",
    }})
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next);
};

module.exports.follow = (req, res, next) => {
  const { id } = req.params;
  // Your code here
};

module.exports.deletePost = (req, res, next) => {
  const { id } = req.params;

  Post.findByIdAndDelete(id)
    .then((post) => {
      if (!post) {
        throw createError(
          StatusCodes.NOT_FOUND,
          `Post with id ${id} not found`
        );
      }
      res.status(204).json();
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

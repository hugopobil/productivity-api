const Follower = require("../models/Follower.model");

// module.exports.followeUser = (req, res, next) => {
//     Follower.findOne({ user: req.currentUserId, follower: req.params.followerId })
//       .then((like) => {
//         if (like) {
//           Like.deleteOne({user: req.currentUserId, post: req.params.postId})
//             .then(() => {
//               res.json('like removed')
//             })
//         } else {
//           Like.create({user: req.currentUserId, post: req.params.postId})
//             .then(() => {
//               res.json('like added')
//             })
//         }
//       })
//   };
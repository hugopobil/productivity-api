const Follower = require("../models/Follower.model");

module.exports.followeUser = (req, res, next) => {
    Follower.findOne({ user: req.currentUserId, follower: req.params.followerId })
      .then((follow) => {
        if (follow) {
            Follower.deleteOne({user: req.currentUserId, follower: req.params.postId})
            .then(() => {
              res.json('like removed')
            })
        } else {
          Follower.create({user: req.currentUserId, follower: req.params.postId})
            .then(() => {
              res.json('follower added')
            })
        }
      })
  };
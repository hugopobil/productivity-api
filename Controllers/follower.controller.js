const Follower = require("../models/Follower.model");

module.exports.follow = (req, res, next) => {

    Follower.findOne({
        $and: [{ userId: userId }, { followerId: followerId }]
    })
        .then((follower) => {
            if (follower) {
                throw new Error("User already follows");
            } else {
                return Follower.create({
                    userId: userId,
                    followerId: followerId
                });
            }
        })
        .then((newFollower) => {
            res.status(201).json(newFollower);
        })
        .catch(next);
}

module.exports.unfollow = (req, res, next) => {
    Follower.findOneAndDelete({
        $and: [{ userId: userId }, { followerId: followerId }]
    })
        .then((follower) => {
            if (!follower) {
                throw new Error("User does not follow");
            } else {
                res.status(204).json();
            }
        })
        .catch(next);
}
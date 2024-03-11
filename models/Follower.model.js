const mongoose = require('mongoose');

const followeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  followerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Follower',
    required: true
  }
});

const Follower = mongoose.model('Follower', likeSchema);

module.exports = Follower;
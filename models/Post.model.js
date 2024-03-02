const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

postSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "post",
  justOne: false,
});
postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
  justOne: false,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

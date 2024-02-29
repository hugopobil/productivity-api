const mongoose = require("mongoose");
const Post = require("../models/Post.model");
const Like = require("../models/Like.model");

// Connect to the database
mongoose
  .connect("mongodb://localhost:27017/productivity-ddbb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");

    // Generate synthetic posts
    const post = {
      title: "Post 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      location: "New York",
      user: "65df73c118698073ad55aa4d",
      image: "https://picsum.photos/200/300",
      createdAt: new Date(),
      comments: [],
    };

    const createArrayOfJsons = (json, number) => {
      const array = [];
      for (let i = 0; i < number; i++) {
        array.push(json);
      }
      return array;
    };

    posts = createArrayOfJsons(post, 10);

    // Save the posts to the database
    Post.deleteMany({})
      .then(() => {
        console.log("Posts deleted successfully");
        // Rest of the code...
        Post.insertMany(posts)
          .then((createdPosts) => {
            console.log("Posts created successfully");
            const likesPromises = createdPosts.map(post => Like.create({ user: "65df73c118698073ad55aa4d", post: post._id}))

            Promise.all(likesPromises)
              .then(() => {
                console.log("Likes created successfully");
                mongoose.connection.close();
              })
              .catch((error) => {
                console.error("Error creating likes:", error);
                mongoose.connection.close();
              });
          })
          .catch((error) => {
            console.error("Error creating posts:", error);
            mongoose.connection.close();
          });
      })
      .catch((error) => {
        console.error("Error deleting posts:", error);
        mongoose.connection.close();
      });

    // Save the posts to the database
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

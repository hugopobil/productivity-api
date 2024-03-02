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
      title: "Proyecto 1",
      content: "Hoy he dedicado 4h a trabajar en el proyecto 1",
      location: "Ironhack",
      user: "65d9ef2724135106a854922a",
      image: "https://picsum.photos/200/300",
      createdAt: new Date(),
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

const mongoose = require("mongoose");
const Post = require("../models/Post.model");

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
      user: "hugopobil",
      image: "https://picsum.photos/200/300",
      createdAt: new Date(),
      likes: 0,
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
          .then(() => {
            console.log("Posts created successfully");
            mongoose.connection.close();
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

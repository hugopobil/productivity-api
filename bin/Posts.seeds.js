const mongoose = require('mongoose');
const Post = require('../models/Post.model');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/productivity-ddbb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    
    // Generate synthetic posts
    const posts = [
      {
        title: 'Post 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        location: 'New York',
        user: 'hugopobil',
        image: 'https://example.com/image1.jpg',
        createdAt: new Date()
      },
      {
        title: 'Post 2',
        content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
        location: 'London',
        user: 'vladilovaca',
        image: 'https://example.com/image2.jpg',
        createdAt: new Date()
      },
      // Add more posts here...
    ];

    // Save the posts to the database
    Post.insertMany(posts)
      .then(() => {
        console.log('Posts created successfully');
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error('Error creating posts:', error);
        mongoose.connection.close();
      });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
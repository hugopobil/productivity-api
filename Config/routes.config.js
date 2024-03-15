const router = require('express').Router();
const usersController = require('../Controllers/users.controller');
const authController = require('../Controllers/auth.controller');
const authMiddleware = require('../Middlewares/auth.middleware');
const postController = require('../Controllers/post.controller');
const commentController = require('../Controllers/comment.controller');
const chatController = require('../Controllers/chat.controller');
const upload = require('./storage.config');
const messageController = require('../Controllers/message.controller')
const followsController = require('../Controllers/follow.controller')

//Authentication
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get("/activate/:token", usersController.activate)

// routes
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get("/users", authMiddleware.isAuthenticated, usersController.getUsers);
router.post("/users/create", upload.single('image'), usersController.createUser);
router.get("/users/:id", usersController.getUser);
router.get("/profile/:id", usersController.getUserFromPost);
router.put("/editprofile/:userId", authMiddleware.isAuthenticated, usersController.editUser)
// router.post("/users", usersController.createUser);

// post routes
router.get("/posts", postController.getPosts);
router.post("/posts/createNewPost", upload.single('image'), authMiddleware.isAuthenticated, postController.createPost);
router.get("/posts/:id", postController.getPost);
router.put("/posts/:id", postController.updatePost);
router.post("/posts/like/:postId", authMiddleware.isAuthenticated,  postController.likePost);
router.post("/posts/:postId/comment", commentController.commentPost);
router.get("/posts/user/:userId", postController.getPostsByUser);
router.delete("/posts/delete/:id",authMiddleware.isAuthenticated, postController.deletePost);

// comments
router.get("/comments", commentController.getComments);
router.delete("/posts/:commentId", commentController.deleteComment);

//Messages
router.get("/chats/:chatId/messages", authMiddleware.isAuthenticated, messageController.getMessageById)
router.post("/chats/:chatId/messages/create", authMiddleware.isAuthenticated, messageController.createMessage);


//Chats
router.get("/chats/me", authMiddleware.isAuthenticated, chatController.allChats);
router.get("/chats/:chatId", authMiddleware.isAuthenticated, chatController.getChat)
router.post("/chats/create/:userId", authMiddleware.isAuthenticated, chatController.createChat);
router.delete("/chats/:chatId/delete", authMiddleware.isAuthenticated, chatController.deleteChat); 
router.get("/chats/getChatByUsers/:userId", authMiddleware.isAuthenticated, chatController.getChatByUsers);
router.delete("/chats/:chatId/delete", authMiddleware.isAuthenticated, chatController.deleteChat);

// Follows
router.post('/follows/:followedId', authMiddleware.isAuthenticated, followsController.toggleFollow);
router.get('/following/me', authMiddleware.isAuthenticated, followsController.getCurrentUserFollowing);
router.get('/following/:id', authMiddleware.isAuthenticated, followsController.getUserFollowing);
router.get('/followed/me', authMiddleware.isAuthenticated, followsController.getCurrentUserFollowed);
router.get('/followed/:id', authMiddleware.isAuthenticated, followsController.getUserFollowed);


// router.post("follow/:id/:followerId", authMiddleware.isAuthenticated, followeController.followUser)

module.exports = router;
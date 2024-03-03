const router = require('express').Router();
const usersController = require('../Controllers/users.controller');
const authController = require('../Controllers/auth.controller');
const authMiddleware = require('../Middlewares/auth.middleware');
const postController = require('../Controllers/post.controller');
const commentController = require('../Controllers/comment.controller');
const chatController = require('../Controllers/chat.controller');
const upload = require('./storage.config');

//Authentication
router.post('/login', authController.login)
router.get('/logout', authController.logout)

// routes
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get("/users", authMiddleware.isAuthenticated, usersController.getUsers);
router.post("/users/create", upload.single('image'), usersController.createUser);
// router.post("/users", usersController.createUser);

// post routes
router.get("/posts", postController.getPosts);
router.post("/posts/create", upload.single('image'), authMiddleware.isAuthenticated, postController.createPost);
router.get("/posts/:id", postController.getPost);
router.put("/posts/:id", postController.updatePost);
router.post("/posts/like/:postId", authMiddleware.isAuthenticated,  postController.likePost);
router.post("/posts/:postId/comment", commentController.commentPost);
router.get("/posts/user/:userId", postController.getPostsByUser);

// comments
router.get("/comments", commentController.getComments);
router.delete("/posts/:commentId", commentController.deleteComment);

module.exports = router;
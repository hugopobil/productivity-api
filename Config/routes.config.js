const router = require('express').Router();
const userController = require('../controllers/users.controller');
const authController = require('../Controllers/auth.controller');
const authMiddleware = require('../Middlewares/auth.middleware');
const postController = require('../Controllers/post.controller');
const commentController = require('../Controllers/comment.controller');
const chatController = require('../Controllers/chat.controller');

//Authentication
router.post('/login', authController.login)

// routes
// router.get("/users", authMiddleware.isAuthenticated, userController.getUsers);
router.get("/users", userController.getUsers);
router.post("/users/create", userController.createUser);

// post routes
router.get("/posts", postController.getPosts);
router.post("/posts/create", postController.createPost);
router.get("/posts/:id", postController.getPost);

// comments
router.get("/comments", commentController.getComments);

module.exports = router;
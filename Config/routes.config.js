const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const authController = require('../Controllers/auth.controller');
const authMiddleware = require('../Middlewares/auth.middleware');
const postController = require('../Controllers/post.controller');
const commentController = require('../Controllers/comment.controller');
const chatController = require('../Controllers/chat.controller');

//Authentication
router.post('/login', authController.login)

// routes
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get("/users", authMiddleware.isAuthenticated, usersController.getUsers);
router.post("/users/create", usersController.createUser);

// post routes
router.get("/posts", postController.getPosts);
router.post("/posts/create", postController.createPost);
router.get("/posts/:id", postController.getPost);
router.put("/posts/:id", postController.updatePost);

// comments
router.get("/comments", commentController.getComments);

module.exports = router;
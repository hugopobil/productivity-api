const router = require('express').Router();
const userController = require('../controllers/users.controller');
const authController = require('../Controllers/auth.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

//Authentication
router.post('/login', authController.login)

// routes
router.get("/users", authMiddleware.isAuthenticated, userController.getUsers);
router.post("/users/create", userController.createUser);

// post routes
router.get("/posts", userController.getPosts);
router.post("/posts/create", userController.createPost);
router.get("/posts/:id", userController.getPost);

// comments
router.get("/comments", userController.getComments);

module.exports = router;
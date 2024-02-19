const router = require('express').Router();
const userController = require('../controllers/users.controller');

// routes
router.get("/users", userController.getUsers);
router.post("/users/create", userController.createUser);

module.exports = router;
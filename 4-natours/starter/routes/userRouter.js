const express = require("express");
const userController = require('./../controllers/userController')
const router = express.Router();

router.route('/')
    .get(userController.getAllUsers)
router.route('/ :id')
    .get(userController.getUser)
    .post(userController.createUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router
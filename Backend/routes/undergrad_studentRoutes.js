const express = require("express");
const router = express.Router();
const usersController = require('../controllers/undergrad_studentControllers')

router.route("/")
.get(usersController.getAllUsers)
.post(usersController.addNewUser)
.patch(usersController.updateUser)
.delete(usersController.deleteUser);

module.exports = router
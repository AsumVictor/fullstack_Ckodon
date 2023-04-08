const express = require("express");
const router = express.Router();
const honorByuserController = require('../controllers/honorByUserControllers')

router.route("/")
.get(honorByuserController.getHonorOfUser)


module.exports = router
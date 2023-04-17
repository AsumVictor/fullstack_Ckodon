const express = require("express");
const router = express.Router();
const reviewByuserController = require('../../controllers/Specificuser/reviewByUserController')

router.route("/:userId")
.get(reviewByuserController.getReviewByUser)


module.exports = router
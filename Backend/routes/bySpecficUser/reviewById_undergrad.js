const express = require("express");
const router = express.Router();
const reviewById = require('../../controllers/Specificuser/reviewByUserController')

router.route("/:id")
.get(reviewById.getReviewById)


module.exports = router
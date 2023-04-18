const express = require("express");
const router = express.Router();
const ReviewsControllers = require('../controllers/reviewsControllers')

router.route("/delete")
.get(ReviewsControllers.getAllReviews)
.post(ReviewsControllers.addNewReview)
.patch(ReviewsControllers.updateReview)
.delete(ReviewsControllers.deleteReview)

module.exports = router
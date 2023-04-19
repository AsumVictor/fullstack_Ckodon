const express = require("express");
const router = express.Router();
const ReviewsControllers = require('../controllers/reviewsControllers')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/")
.get(ReviewsControllers.getAllReviews)
.post(ReviewsControllers.addNewReview)
.patch(ReviewsControllers.updateReview)
.delete(ReviewsControllers.deleteReview)

module.exports = router
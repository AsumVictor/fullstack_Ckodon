const express = require("express");
const router = express.Router();
const recommendationControllers = require('../controllers/recommendationsControllers')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/")
.get(recommendationControllers.getRecommendations)
.post(recommendationControllers.addNewRecommendation)
.patch(recommendationControllers.updateRecommendation)
.delete(recommendationControllers.deleteRecommendation);

module.exports = router
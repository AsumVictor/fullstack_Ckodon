const express = require("express");
const router = express.Router();
const recommendationByuserController = require('../../controllers/Specificuser/recommendationByUser')

router.route("/")
.get(recommendationByuserController.getRecommendationOfUser)


module.exports = router
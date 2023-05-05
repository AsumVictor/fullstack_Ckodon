const express = require("express");
const router = express.Router();
const recommendationByuserController = require('../../controllers/Specificuser/recommendationByUser')
const verifyJWT = require('../../middleware/verifyJWT')

router.use(verifyJWT)

router.route("/:userId")
.get(recommendationByuserController.getRecommendationOfUser)


module.exports = router
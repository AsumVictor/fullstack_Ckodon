const express = require("express");
const router = express.Router();
const reviewByuserController = require('../../controllers/Specificuser/reviewByUserController')
const verifyJWT = require('../../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/:document")
.get(reviewByuserController.getReviewByDocument)

module.exports = router
const express = require("express");
const router = express.Router();
const reviewByuserController = require('../../controllers/Specificuser/reviewByUserController')
const verifyJWT = require('../../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/:userId")
.get(reviewByuserController.getReviewByUser)


module.exports = router
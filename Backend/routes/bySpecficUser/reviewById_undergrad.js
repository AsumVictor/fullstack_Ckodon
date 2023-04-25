const express = require("express");
const router = express.Router();
const reviewById = require('../../controllers/Specificuser/reviewByUserController')
const verifyJWT = require('../../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/:id")
.get(reviewById.getReviewById)


module.exports = router
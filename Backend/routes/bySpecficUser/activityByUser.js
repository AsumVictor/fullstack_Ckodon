const express = require("express");
const router = express.Router();
const activityByuserController = require('../../controllers/Specificuser/activityByUser')
const verifyJWT = require('../../middleware/verifyJWT')

router.use(verifyJWT)

router.route("/:userId")
.get(activityByuserController.getActivityOfUser)


module.exports = router
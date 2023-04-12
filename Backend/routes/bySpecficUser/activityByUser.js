const express = require("express");
const router = express.Router();
const activityByuserController = require('../../controllers/Specificuser/activityByUser')

router.route("/")
.get(activityByuserController.getActivityOfUser)


module.exports = router
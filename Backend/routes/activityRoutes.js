const express = require("express");
const router = express.Router();
const activityControllers = require('../controllers/activiesControllers')

router.route("/")
.get(activityControllers.getActivities)
.post(activityControllers.addNewActivity)
.patch(activityControllers.updateActivity)
.delete(activityControllers.deleteActivity);

module.exports = router
const express = require("express");
const router = express.Router();
const activityControllers = require('../controllers/activiesControllers')

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/")
.get(activityControllers.getActivities)
.post(activityControllers.addNewActivity)
.patch(activityControllers.updateActivity)
.delete(activityControllers.deleteActivity);

module.exports = router
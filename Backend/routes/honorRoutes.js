const express = require("express");
const router = express.Router();
const honorControllers = require('../controllers/honorsControllers')

router.route("/")
.get(honorControllers.getHonors)
.post(honorControllers.addNewHonor)
.patch(honorControllers.updateHonor)
.delete(honorControllers.deleteHonor);

module.exports = router
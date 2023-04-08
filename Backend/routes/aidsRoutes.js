const express = require("express");
const router = express.Router();
const aidControllers = require('../controllers/aidsControllers')

router.route("/")
.get(aidControllers.getAids)
.post(aidControllers.addNewAid)
.patch(aidControllers.updateAid)
.delete(aidControllers.deleteAid);

module.exports = router
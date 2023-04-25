const express = require("express");
const router = express.Router();
const honorControllers = require('../controllers/honorsControllers')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/")
.get(honorControllers.getHonors)
.post(honorControllers.addNewHonor)
.patch(honorControllers.updateHonor)
.delete(honorControllers.deleteHonor);

module.exports = router
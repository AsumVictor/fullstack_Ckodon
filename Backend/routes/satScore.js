const express = require("express");
const router = express.Router();
const satController = require('../controllers/satScore')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/")
.get(satController.getSats)
.post(satController.addNewSat)
.patch(satController.updateSat)
.delete(satController.deleteSat);

router.route("/:userId")
.get(satController.getStudentSat)

module.exports = router
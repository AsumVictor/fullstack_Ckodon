const express = require("express");
const router = express.Router();
const undergraduteApplicantsController = require('../controllers/undergraduteApplicantsControllers')

router.route("/")
.get(undergraduteApplicantsController.getAllUndergraduateApplicants)
.post(undergraduteApplicantsController.addNewApplicant)


module.exports = router
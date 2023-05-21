const express = require("express");
const router = express.Router();
const mentorController = require('../controllers/mentorController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)
router.route("/")
.get(mentorController.getAllMentors)
.post(mentorController.addNewMentor)
.patch(mentorController.updateMentor)
.delete(mentorController.deleteMentor);

router.route("/:id")
.get(mentorController.getSpecificMentor)

router.route("/asign")
.patch(mentorController.asignMentorMentee)

module.exports = router
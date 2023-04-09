const express = require("express");
const router = express.Router();
const aidByuserController = require('../../controllers/Specificuser/aidByUser')

router.route("/")
.get(aidByuserController.getAidOfUser)


module.exports = router
const express = require("express");
const router = express.Router();
const essayByuserController = require('../../controllers/Specificuser/essayByUser')

router.route("/")
.get(essayByuserController.getEssayOfUser)


module.exports = router
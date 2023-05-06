const express = require("express");
const router = express.Router();
const essayByuserController = require('../../controllers/Specificuser/essayByUser')
const verifyJWT = require('../../middleware/verifyJWT')

router.use(verifyJWT)

router.route("/:userId")
.get(essayByuserController.getEssayOfUser)


module.exports = router
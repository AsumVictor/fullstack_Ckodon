const express = require("express");
const router = express.Router();
const aidByuserController = require('../../controllers/Specificuser/aidByUser')
const verifyJWT = require('../../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/:userId")
.get(aidByuserController.getAidOfUser)


module.exports = router
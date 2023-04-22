const express = require("express");
const router = express.Router();
const honorByuserController = require('../../controllers/Specificuser/honorByUserControllers')
const verifyJWT = require('../../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/:userId")
.get(honorByuserController.getHonorOfUser)


module.exports = router
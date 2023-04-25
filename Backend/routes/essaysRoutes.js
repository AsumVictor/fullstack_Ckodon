const express = require("express");
const router = express.Router();
const essayControllers = require('../controllers/essaysControllers')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/")
.get(essayControllers.getEssays)
.post(essayControllers.addNewEssay)
.patch(essayControllers.updateEssay)
.delete(essayControllers.deleteEssay);

module.exports = router
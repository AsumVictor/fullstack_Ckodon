const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController')

router.route("/")
.get(adminController.getAllAdmins)
.post(adminController.addNewAdmin)
.patch(adminController.updateAdmin)
.delete(adminController.deleteAdmin);

module.exports = router
const express = require("express");
const router = express.Router();
const userSchema = require("../controller/user");

router.post("/register", userSchema.register);
router.get("/all", userSchema.getAll);
module.exports = router;

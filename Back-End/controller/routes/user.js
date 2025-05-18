const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/createUser");
const { getUser, getUserById } = require("../controller/getUser");
const { deleteUser } = require("../controller/deleteUser");
const {updateUser} = require("../controller/updateUser");

router.post("/createUser", createUser);
router.get("/getallUsers", getUser);
router.get("/getUser/:id", getUserById);
router.delete("/deleteUser/:id", deleteUser);
router.put("/edit/:id", updateUser);

module.exports = router;
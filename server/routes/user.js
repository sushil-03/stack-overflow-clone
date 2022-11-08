const express = require("express");
const router = express.Router();
const {
    getSingIn,
    getLogIn,
    getAllUser,
    getLogOut,
    getUserInfo,
} = require("../controller/userController");

const { isAuthenticated } = require("../middleware/auth");
router.post("/signup", getSingIn);
router.post("/login", getLogIn);
router.get("/users", getAllUser);
router.route("/logout").get(isAuthenticated, getLogOut);
router.route("/me").get(isAuthenticated, getUserInfo);

module.exports = router;

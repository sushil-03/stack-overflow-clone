const express = require("express");
const {
    getAllQuestion,
    createQuestion,
    voteQuestion,
    addAnswer,
} = require("../controller/questionController");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
router.get("/questions", getAllQuestion);
router.route("/question/create").post(isAuthenticated, createQuestion);
router.route("/question/vote").put(isAuthenticated, voteQuestion);
router.route("/question/answer").post(isAuthenticated, addAnswer);
module.exports = router;

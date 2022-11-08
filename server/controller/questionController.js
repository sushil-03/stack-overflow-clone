const Question = require("../models/questionModel");
const User = require("../models/userModel");
exports.getAllQuestion = async (req, res, next) => {
    const keyword = req.query.keyword
        ? {
              heading: {
                  $regex: req.query.keyword,
                  $options: "i",
              },
          }
        : {};
    const allQuestion = await Question.find({ ...keyword }).populate("askedBy");
    if (!allQuestion) {
        return res.status(404).json({
            success: false,
            message: "No Question",
        });
    }
    res.status(200).json({
        success: true,
        message: allQuestion,
    });
};
exports.createQuestion = async (req, res, next) => {
    const { heading, detail, tags } = req.body;
    try {
        const askedBy = req.user._id.valueOf();
        const newQuestion = await Question.create({
            heading,
            detail,
            tags,
            askedBy,
        });
        try {
            const user = await User.findOne({ _id: askedBy });
            user.question += 1;
            await user.save();
        } catch (error) {
            res.status(404).json({
                success: false,
                message: "User error",
                errror: error,
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: newQuestion,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error,
        });
    }
};
exports.voteQuestion = async (req, res, next) => {
    const { question_id, user_new_status } = req.body;
    try {
        const question = await Question.findOne({ _id: question_id });
        const user = req.user;

        const user_previous_status = user.activity.filter((ques) => {
            return ques.question_id.valueOf() === question_id;
        });

        if (user_previous_status.length == 0) {
            user.activity.push({
                question_id,
                status: user_new_status,
            });
            if (user_new_status == "UpVote") {
                question.votes += 1;
            } else if (user_new_status == "DownVote") {
                question.votes -= 1;
            }
        } else {
            const user_previous_status = user.activity.filter(
                (ques) => ques.question_id == question_id
            );
            const prev_status = user_previous_status[0].status;
            let new_status = prev_status;
            let new_votes = question.votes;
            if (prev_status === "No Response") {
                if (user_new_status === "UpVote") {
                    new_votes = question.votes + 1;
                    new_status = "UpVote";
                } else {
                    new_votes = question.votes - 1;
                    new_status = "DownVote";
                }
            } else if (prev_status === "UpVote") {
                if (user_new_status === "DownVote") {
                    new_votes = question.votes - 1;
                    new_status = "No Response";
                }
            } else {
                if (user_new_status === "UpVote") {
                    new_votes = question.votes + 1;
                    new_status = "No Response";
                }
            }
            if (new_votes === question.votes) {
                return res.status(404).json({
                    success: false,
                    message: "Question already voted",
                });
            }
            user_previous_status[0].status = new_status;
            question.votes = new_votes;
        }
        await user.save();
        await question.save();
        res.status(200).json({
            success: true,
            votes: question.votes,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error,
        });
    }
};

exports.addAnswer = async (req, res, next) => {
    const { answer, question_id } = req.body;
    try {
        const user_id = req.user._id.valueOf();
        const question = await Question.findOne({ _id: question_id });
        question.answers.push({
            answer,
            author: user_id,
        });
        await question.save();
        const questions = await Question.find().populate("askedBy");
        res.status(200).json({
            success: true,
            questions,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error,
        });
    }
};

const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    heading: { type: String, required: true },
    detail: { type: String, required: true },
    votes: { type: Number, default: 0 },
    tags: [{ type: String, required: true }],
    askedBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    answers: [
        {
            answer: { type: String },
            author: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
        },
    ],
});
module.exports = mongoose.model("Questions", questionSchema);

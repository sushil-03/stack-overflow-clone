const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    about: { type: String },
    activity: [
        {
            question_id: {
                type: mongoose.Schema.ObjectId,
                ref: "Question",
            },
            status: { type: String, default: "No Respone" },
        },
    ],
    tags: [{ type: String }],
    phone: { type: Number, required: true },
    question: { type: Number, default: 0 },
    joinedOn: { type: Date, default: Date.now },
});
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
module.exports = mongoose.model("User", userSchema);

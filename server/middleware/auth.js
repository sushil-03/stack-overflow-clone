const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.status(404).json({
            success: false,
            message: "Please login to access resource",
        });
        return;
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedData.id);
    next();
};

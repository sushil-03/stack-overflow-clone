const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const cors = require("cors");
require("dotenv").config({ path: "./database/config.env" });
const connectDB = require("./database/data");
const path = require("path");
connectDB();
app.use(cors());

const PORT = process.env.PORT || 3000;
// const PORT = 5001;

const user = require("./routes/user");
const question = require("./routes/question");
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/v1", user);
app.use("/api/v1", question);

// app.get("/", (req, res) => {
//     res.send("CHECK IF LIVE");
// res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
// });

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server runnig on port number http://localhost:${PORT}`);
});

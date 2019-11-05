require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const apiUserRoute = require("./api/routes/user.route");
const apiPostRoute = require("./api/routes/post.route");

const app = express();
const port = process.env.PORT;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("11234567899"));

app.use("/api", apiUserRoute);
app.use("/api", apiPostRoute);

app.listen(port, () => {
  console.log(`listening port : ${port}`);
});

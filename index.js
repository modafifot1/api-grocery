require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const apiUserRoute = require("./api/routes/user.route");
const apiProductRoute = require("./api/routes/product.route");
const apiOrderRoute = require("./api/routes/order.route");

const app = express();
mongoose.connect(process.env.MONGO_URL);

const port = process.env.PORT;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("11234567899"));

app.use("/api", apiUserRoute);
app.use("/api", apiProductRoute);
app.use("/api", apiOrderRoute);

app.listen(port, () => {
  console.log(`listening port : ${port}`);
});

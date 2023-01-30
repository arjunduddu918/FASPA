const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "http://127.0.0.1:5501", credentials: true }));
app.use(cookieParser());
const PORT = process.env.PORTS || 8080;


require("./DB/connetions");



app.use("/create", require("./router/auth"));
app.use("/covid", require("./router/covidInfoRoute"));

app.listen(PORT, () => {
	console.log(`Hi there it is listining on Port number ${PORT}`);
});

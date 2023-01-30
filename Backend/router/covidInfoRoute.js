const express = require("express");
const router = express.Router();
const Test = require("../models/covidInfoSchema");

router.get("/", async (req, res) => {
	const test = await Test.find();
	res.json(test);
});

router.post("/new", async (req, res) => {
	console.log(req.body);
	const newTest = new Test(req.body);
	const saveTest = await newTest.save();
	res.json(saveTest);
});

module.exports = router;

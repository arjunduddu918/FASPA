const mongoose = require("mongoose");

const url = "mongodb://localhost/tem";
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("connetion sucessfull");
	})
	.catch((error) => {
		console.log("there was an error");
	});

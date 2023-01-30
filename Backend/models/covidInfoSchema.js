const mongoose = require("mongoose");

const CovidSchema = new mongoose.Schema({
	fullName: String,
	country: String,
	city: String,
	Age: Number,

	fever: Boolean,
	haveCough: Boolean,
	Cold: Boolean,

	dose: Number,
	covid: Boolean,
	subject: String,
});

module.exports = mongoose.model("Covid", CovidSchema);

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
	catagory: { type: String, required: true },
	color: { type: String, required: true },
	model: { type: String, required: true },
	make: { type: String, required: true },
	registrationNo: { type: String, required: true }
});

const CarSchema = mongoose.model("Car", carSchema);

module.exports = { CarSchema };
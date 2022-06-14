const mongoose = require("mongoose");

const catagorySchema = new mongoose.Schema({
	catagory: { type: String, required: true },
});

const CatagorySchema = mongoose.model("Catagory", catagorySchema);

module.exports = { CatagorySchema };
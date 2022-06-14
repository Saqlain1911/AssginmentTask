const express = require('express');
const router = require("express").Router();
const { CatagorySchema } = require("../models/catagory");

router.post("/", async (req, res) => {

	try {

        let cata = new CatagorySchema({ catagory: req.body.catagory})
		const reslt = await cata.save();
		if (reslt){
			return res.send({ message: "Catagory Added" });
        }else{

            return res.send({ message: "Failed" });
        }
	} catch (error) {
		res.send({ message: "Internal Server Error" });
	}
});

router.get("/", async (req, res) => {

	try {

		const reslt = await CatagorySchema.find();
		if (reslt){
			return res.send({ message: "Catagory Added" , data : reslt });
        }else{

            return res.send({ message: "Failed" });
        }
	} catch (error) {
		res.send({ message: "Internal Server Error" });
	}
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
	try {
		const reslt = await CatagorySchema.findByIdAndRemove({_id : id })

		if (reslt){
			return res.send({ message: "Catagory Deleted" , data : reslt });
        }else{

            return res.send({ message: "Failed" });
        }
	} catch (error) {
		res.send({ message: "Internal Server Error" });
	}
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
	try {
		const reslt = await CatagorySchema.findByIdAndUpdate({_id : id } , {catagory : req.body.catagory})

		if (reslt){
			return res.send({ message: "Catagory Updated" , data : reslt });
        }else{

            return res.send({ message: "Failed" });
        }
	} catch (error) {
		res.send({ message: "Internal Server Error" });
	}
});

module.exports = router;

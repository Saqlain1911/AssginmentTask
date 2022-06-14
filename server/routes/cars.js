const router = require("express").Router();
const { CarSchema } = require("../models/Car");

router.post("/", async (req, res) => {
	try {
        let cata = new CarSchema(req.body)
		const reslt = await cata.save();
		if (reslt){
			return res.send({ message: "Car Added" });
        }else{

            return res.send({ message: "Failed" });
        }
	} catch (error) {
		res.send({ message: "Internal Server Error" });
	}
});

router.get("/", async (req, res) => {

	try {
		const reslt = await CarSchema.find();
		if (reslt){
			return res.send({ message: "Car Added" , data : reslt });
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
		const reslt = await CarSchema.findByIdAndRemove({_id : id })

		if (reslt){
			return res.send({ message: "Car Deleted" , data : reslt });
        }else{

            return res.send({ message: "Failed" });
        }
	} catch (error) {
		res.send({ message: "Internal Server Error" });
	}
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
	let data ={
		catagory : req.body.catagory , 
		color : req.body.color ,
		model : req.body.model , 
		make : req.body.make,
		registrationNo : req.body.registrationNo,
	}
	try {
		const reslt = await CarSchema.findByIdAndUpdate({_id : id } , data)

		if (reslt){
			return res.send({ message: "Car Updated" , data : reslt });
        }else{

            return res.send({ message: "Failed" });
        }
	} catch (error) {
		res.send({ message: "Internal Server Error" });
	}
});

module.exports = router;

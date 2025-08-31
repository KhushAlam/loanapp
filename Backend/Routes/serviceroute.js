import express from "express";
import Services from "../Models/serviceSchema.js";
import serviceValidator from "../Validator/formvalidator.js"

const serviceRouter = express.Router();

serviceRouter.get("/get", async (req, res) => {
    //fatech all data from db 
    try {
        const data = await Services.find();
        if (data) {
            res.status(200).json({data:data, message: "Data Fetch Sucessfully" });
        } else {
            res.status(404).json({ message: "Data Not Found" })
        }
    } catch (err) {
        if (err) {
            res.status(500).json({message:"Problem in Server"})
        }
    }
})
serviceRouter.post("/create", serviceValidator, async (req, res) => {
    try {
        const inputdata = req.body;
        const newservice = new Services(inputdata);
        if (newservice) {
            await newservice.save();
            res.send({ message: "Service Saved Sucessfully" });
        } else {
            res.send({ message: "Service not come from FrontEnd" })
        }
    } catch (err) {
        if (err) {
            res.send({ message: "Internal Server Problem" });
        }
    }
})

serviceRouter.patch("/update/:id",serviceValidator, async (req, res) => {
    try {
        const { id } = req.params;
        const updateddata = req.body;
        const Service = await Services.findByIdAndUpdate(id, updateddata, {
            new: true,
            runValidators: true
        })
        if (!Service) {
            return res.status(404).json({ message: "Loan not found" });
        }

        res.status(200).json({
            message: "Loan updated successfully",
        });

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})

serviceRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Services.findByIdAndDelete(id);
        if (!service) {
            return res.status(404).json({ message: "Service Not Found" })
        }
        res.json({ message: "Service deleted sucessfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default serviceRouter;
import express from "express";
import Services from "../Models/serviceSchema.js";
import multer from "multer"

const serviceRouter = express.Router();

const upload = multer()
serviceRouter.get("/get", async (req, res) => {
    //fatech all data from db 
    try {
        const data = await Services.find();
        if (data) {
            res.status(200).json({ data: data, message: "Data Fetch Sucessfully" });
        } else {
            res.status(404).json({ message: "Data Not Found" })
        }
    } catch (err) {
        if (err) {
            res.status(500).json({ message: "Problem in Server" })
        }
    }
})
serviceRouter.post("/create", upload.none(), async (req, res) => {
    try {
        const inputdata = req.body;
        // inputdata.amount = inputdata.amount?Number(inputdata.amount):null;
        // inputdata.interest = Number(inputdata.interest);
        // inputdata.installment = Number(inputdata.installment);
        // inputdata.duration = Number(inputdata.duration);
        // inputdata.total = Number(inputdata.total);


        const newservice = new Services(inputdata);

        if (newservice) {
            await newservice.save();
            res.send({ message: "Service Saved Sucessfully" });
        } else {
            res.send({ message: "Service not come from FrontEnd" })
        }
    } catch (err) {
        if (err) {
            res.send({ err, message: "Internal Server Problem" });

        }
    }
})

serviceRouter.put("/update/:id", upload.none(), async (req, res) => {
    try {
        let id = req.params.id.trim();
        const updateddata = req.body;

        let data = await Service.findById(id);

        if (!data) return res.status(400).json({ message: "Data not found" });

        updateddata.loantype = updateddata.loantype ? updateddata.loantype : data.loantype;
        updateddata.amount = updateddata.amount ? updateddata.amount : data.amount;
        updateddata.interest = updateddata.interest ? updateddata.interest : data.interest;
        updateddata.duration = updateddata.duration ? updateddata.duration : data.duration;
        updateddata.installment = updateddata.installment ? updateddata.installment : data.installment;
        updateddata.total = updateddata.total ? updateddata.total : data.total;
        updateddata.eligibility = updateddata.eligibility ? updateddata.eligibility : data.eligibility;
        updateddata.active = updateddata.active ? updateddata.active : data.active

        const Service = await Services.findByIdAndUpdate(id, updateddata, {
            new: true,
            runValidators: true
        })
        if (!Service) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({
            message: "Loan updated successfully",
        });

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})

serviceRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id.trim();
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
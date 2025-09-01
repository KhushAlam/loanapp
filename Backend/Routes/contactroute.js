import express from "express";
import Contact from "../Models/contactusSchema.js";

const contactRouter = express.Router();

contactRouter.get("/get", async (req, res) => {
    try {
        const data = await Contact.find();
        if (!data) {
            return res.status(200).json({ message: "data not found" })
        }
        return res.status(200).json({ data: data, message: "data found sucessfully" })
    } catch (err) {
        return res.status(500).json({ message: "internal server problem" })
    }
})

contactRouter.post("/create", async (req, res) => {
    try {
        const newdata = new Contact({
            ...req.body
        })
        await newdata.save()
        return res.status(200).json({ message: "We recaived your message our team contact you as soon as possible" })
    } catch (err) {
        return res.status(500).json({ message: "Internal server problem" })
    }
})

contactRouter.put("/update/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let updatedData = { ...req.body };

        const updated = await Contact.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        })

        if (!updated) {
            return res.status(404).json({ message: "Data not Found" });
        }

        return res.status(200).json({ message: "Data updated sucessfully" });
    } catch (err) {
        return res.status(500).json({ message: "internal server problem" })
    }
})

contactRouter.delete("/delete/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const data = await Contact.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({ message: "data not Found" })
        } else {
            return res.status(200).json({ message: "Data Deleted Sucessfully" })
        }
    } catch (err) {
        return res.status(500).json({ messsage: "internal server problem" })
    }
})

export default contactRouter
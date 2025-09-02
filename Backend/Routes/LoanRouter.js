import express from "express";
import Loan from "../Models/loanSchema.js"
import multer from "multer";
import path from "path";
import mongoose from "mongoose";

const loanRouter = express.Router();

//muter handle,
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "loan/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only image and pdf files are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });


loanRouter.post("/create", upload.fields([{ name: "pic", maxCount: 1 }, { name: "pdfs", maxCount: 4 }]), async (req, res) => {
    try {
        const pic = req.files["pic"] ? req.files["pic"][0].path : null;
        const pdfs = req.files["pdfs"] ? req.files["pdfs"].map(file => file.path) : [];
        const newdata = new Loan({
            ...req.body,
            pic,
            pdfs,
        })
        const save = await newdata.save();
        if (!save) {
            return res.status(500).json({ message: "Problem in data Saving" })
        }
        return res.status(200).json({ message: "Loan applyed Sucessfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal server problem" })
    }
})

loanRouter.get("/get", async (req, res) => {
    try {
        const data = await Loan.find();
        if (data) {
            return res.status(200).json({ data: data, message: "data Found" })
        }
        return res.status(404).json({ message: "issue is data finding" })
    } catch (err) {
        return res.status(500).json({ message: "internal server problem" })
    }
});

loanRouter.put("/update/:id", async (req, res) => {
    try {
        let id = req.params.id
        const data = { ...req.body };
        const update = await Loan.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        })
        if (!update) return res.status(404).json({ message: "data not Found" })

        return res.status(200).json({ message: "Data updated suceefully" })
    } catch (err) {
        return res.status(500).json({ message: "Internal server problem" })
    }
})

loanRouter.delete("/delete/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let data = await Loan.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ message: "data not found" });
        }
        return res.status(200).json({ message: "data Deleted Sucessfully" })

    } catch (err) {
        return res.status(500).json({ message: "internal server problem" })
    }

})
export default loanRouter;
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


loanRouter.post("/create", upload.any(), async (req, res) => {
    try {
        // files array aaega
        let pic = null;

        // sab files check karenge
        req.files.forEach(file => {
            if (file.fieldname === "pic") {
                pic = file.filename;
            } else {
                // baaki sab ko pdfs array me dalenge
                const pancard = req.files.find(f => f.fieldname === "pancard")?.filename;
                const aadharcard = req.files.find(f => f.fieldname === "aadharcard")?.filename;
                const bankpassbook = req.files.find(f => f.fieldname === "bankpassbook")?.filename;
                const salaryslip = req.files.find(f => f.fieldname === "salaryslip")?.filename;

            }
        });

        const newdata = new Loan({
            ...req.body,
            pic,
            pancard,
            aadharcard,
            bankpassbook,
            salaryslip
        });

        const save = await newdata.save();
        if (!save) {
            return res.status(500).json({ message: "Problem in data Saving" });
        }
        return res.status(200).json({ message: "Loan applied Successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server problem" });
    }
});


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
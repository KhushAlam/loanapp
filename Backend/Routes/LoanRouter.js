import express from "express";
import Loan from "../Models/loanSchema.js"
import multer from "multer";


const loanRouter = express.Router();

//muter handle,
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "loan/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
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
        let pancard = null;
        let aadharcard = null;
        let bankpassbook = null;
        let salaryslip = null;

        // sab files check karenge
        req.files.forEach(file => {
            if (file.fieldname === "pic") {
                pic = file.filename;
            } else {
                // baaki sab ko pdfs array me dalenge
                pancard = req.files.find(f => f.fieldname === "pancard")?.filename;
                aadharcard = req.files.find(f => f.fieldname === "aadharcard")?.filename;
                bankpassbook = req.files.find(f => f.fieldname === "bankpassbook")?.filename;
                salaryslip = req.files.find(f => f.fieldname === "salaryslip")?.filename;
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

loanRouter.put("/update/:id", upload.any(), async (req, res) => {
    try {
        let id = req.params.id;

        // agar installments string aayi ho to parse karo
        if (req.body.installment) {
            try {
                req.body.installment = JSON.parse(req.body.installment);
            } catch (e) {
                return res.status(400).json({ message: "Invalid installment format" });
            }
        }

        const existdata = await Loan.findById(id);
        if (!existdata) {
            return res.status(404).json({ message: "Data Not Found" });
        }

        // files handling
        let pic = existdata.pic;
        let pancard = existdata.pancard;
        let aadharcard = existdata.aadharcard;
        let bankpassbook = existdata.bankpassbook;
        let salaryslip = existdata.salaryslip;

        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                switch (file.fieldname) {
                    case "pic":
                        pic = file.filename;
                        break;
                    case "pancard":
                        pancard = file.filename;
                        break;
                    case "aadharcard":
                        aadharcard = file.filename;
                        break;
                    case "bankpassbook":
                        bankpassbook = file.filename;
                        break;
                    case "salaryslip":
                        salaryslip = file.filename;
                        break;
                }
            });
        }

        // update object
        const newdata = {
            ...req.body,
            pic,
            pancard,
            aadharcard,
            bankpassbook,
            salaryslip
        };

        const update = await Loan.findByIdAndUpdate(id, newdata, { new: true });
        if (!update) {
            return res.status(500).json({ message: "Problem in update" });
        }

        return res.status(200).json({ message: "Loan updated successfully", data: update });

    } catch (err) {
        console.error("Update Error:", err);
        return res.status(500).json({ message: "Internal server problem" });
    }
});

// PUT => Update Installment Status
loanRouter.put("/:loanId/installment/:installmentId", upload.none(), async (req, res) => {
    try {
        const { loanId, installmentId } = req.params;

        // Loan find karo
        const loan = await Loan.findById(loanId);
        if (!loan) {
            return res.status(404).json({ success: false, message: "Loan not found" });
        }

        // Installment find karo
        const installment = loan.installment.id(installmentId);
        if (!installment) {
            return res.status(404).json({ success: false, message: "Installment not found" });
        }

        // Update installment
        if (req.body.paid !== undefined) {
            installment.paid = req.body.paid; // true/false
        }
        if (req.body.duedate) {
            installment.duedate = req.body.duedate;
        }
        if (req.body.amount) {
            installment.amount = req.body.amount;
        }

        // Save loan
        await loan.save();

        res.json({ success: true, message: "Installment updated", loan });
    } catch (err) {
        console.error("Update Installment Error:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


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
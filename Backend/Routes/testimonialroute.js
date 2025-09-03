import express from "express";
import Tesitimonial from "../Models/testimonialSchema.js";
import multer from "multer";
import path from "path";

const tesitimonialRouter = express.Router();

// multer configration 
const storage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, "testimonial/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Only JPG and PNG files are allowed"));
        }
        cb(null, true);
    },
    limits: { fileSize: 2 * 1024 * 1024 }
})

tesitimonialRouter.get("/get", async (req, res) => {
    try {
        const data = await Tesitimonial.find();

        if (data && data.length > 0) {
            const getdata = data.map((item) => {
                return {
                    ...item.toObject(),
                    pic: `http://localhost:8090/testimonial/${item.pic}`
                }
            })

            return res.status(200).json({ data: getdata, message: "Data found Sucessfully" });

        } else {
            return res.status(404).json({ message: "Data not Found" });
        }
    } catch (err) {

        console.log(err);
        return res.status(400).json({ message: "Internal server problem" })

    }
})

tesitimonialRouter.post("/create", upload.single("pic"), async (req, res) => {
    try {
        // Check if pic is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Pic field is required" });
        }

        // Destructure fields from body
        const { name, description, city, active } = req.body;

        // Check required fields
        if (!name || !description) {
            return res.status(400).json({ message: "Name and Description are required" });
        }

        // Check if testimonial with same name exists
        const existdata = await Tesitimonial.findOne({ name });
        if (existdata) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new testimonial
        const newdata = new Tesitimonial({
            name,
            description,
            city,
            active,
            pic: req.file.filename
        });

        await newdata.save();
        return res.status(200).json({ message: "Data saved successfully" });

    } catch (err) {
        console.log(err);
        return res.status(500).json([{ message: "Internal server problem" }]);
    }
});

tesitimonialRouter.put("/update/:id", upload.single("pic"), async (req, res) => {
    try {
        const id = req.params.id;
        let updatedData = { ...req.body };

        const existdata = await Tesitimonial.findById(id);
        if (!existdata) {
            return res.status(404).json({ message: "Data not Found" });
        }

        // agar nayi file ayi hai to uska naam use karo
        if (req.file) {
            updatedData.pic = req.file.filename;
        } else {
            updatedData.pic = existdata.pic;
        }

        const update = await Tesitimonial.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json({
            message: "Data updated successfully",
            data: update
        });

    } catch (err) {
        console.error("Update error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

tesitimonialRouter.delete("/delete/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let data = await Tesitimonial.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ message: "data not found" })
        }
        return res.status(200).json({ message: "data Deleted sucessfully" });
    } catch (err) {
        return res.status(500).json({ message: "internal server problem" })
    }
})
export default tesitimonialRouter;
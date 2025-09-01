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
                    pic: `http://localhost:8090/uploads/${item.pic}`
                }
            })

            return res.status(200).json({ data: getdata, message: "Data found Sucessfully" });

        } else {

            return res.status(404).json({ message: "Data not Found" });
        }
    } catch (err) {

        return res.status(400).json({ message: "Internal server problem" })

    }
})

tesitimonialRouter.post("/create", upload.single("pic"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400), json({ message: "pic feild is required" });
        }
        const newdata = new Tesitimonial({
            ...req.body,
            pic: req.file.filename
        })

        await newdata.save();
        return res.status(200).json({ message: "Data saved sucessfully" });
    } catch (err) {
        res.status(500).json({ message: "internal server problem" })
    }
})

tesitimonialRouter.put("/update/:id", upload.single("pic"), async (req, res) => {
    try {
        let id = req.params.id;
        const updatedData = { ...req.body }

        if (req.file) {
            updatedData.pic = req.file.filename
        }

        const update = await Tesitimonial.findByIdAndUpdate(id, updatedData);

        if (!update) {
            return res.status(404).json({ message: "Data not Found" });
        }

        return res.status(200).json({ message: "Data update sucessfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal server problem" });
    }
})

tesitimonialRouter.delete("/delete/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let data = Tesitimonial.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ message: "data not found" })
        }
        return res.status(200).json({ message: "data Deleted sucessfully" });
    } catch (err) {
        return res.status(500).json({ message: "internal server problem" })
    }
})
export default tesitimonialRouter;
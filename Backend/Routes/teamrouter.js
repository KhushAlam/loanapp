import express from "express";
import Team from "../Models/teamSchema.js";
import multer from "multer";
import path from "path";

const teamRouter = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // uploads folder me save hoga
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
    // unique name (timestamp + extension)
  }
});

// Multer middleware
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPG and PNG files are allowed"));
    }
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 } // max 2 MB
});

teamRouter.get("/get", async (req, res) => {
    try {
        const data = await Team.find();

        if (data && data.length > 0) {
            const formattedData = data.map(item => ({
                _id: item._id,
                name: item.name,
                work: item.work,
                description: item.description,
                pic: `http://localhost:8090/uploads/${item.pic}`  // full URL
            }));

            return res.status(200).json({ data: formattedData, message: "Data Found successfully" });
        } else {
            return res.status(404).json({ message: "Data not Found" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Problem" });
    }
});


teamRouter.post("/create", upload.single("pic"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Pic is required" });
        }

        const newTeam = new Team({
            ...req.body, 
            pic:req.file.filename
        });
        console.log(newTeam);

        await newTeam.save();
        return res.status(201).json({ message: "Team Member added successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Problem" });
    }
});

teamRouter.patch("/update/:id", upload.single("pic"), async (req, res) => {
    try {
        let id = req.params.id;
        let updatedData = { ...req.body };

        if (req.file) {
            updatedData.pic = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const updated = await Team.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });

        if (!updated) {
            return res.status(404).json({ message: "Data not Found" });
        }

        return res.status(200).json({ message: "Data updated successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Problem" });
    }
});

teamRouter.delete("/delete/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const data = await Team.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({ message: "Data Not found" });
        }

        return res.status(200).json({ message: "Data Deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Problem" });
    }
});

export default teamRouter;

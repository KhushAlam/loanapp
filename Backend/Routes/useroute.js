import express from "express";
import User from "../Models/userSchema.js";
import Blacklist from "../Models/Blicklisttoken.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "users/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only JPG and PNG files are allowed"));
    }
    cb(null, true);
}

const upload = multer({ storage, fileFilter });
userRouter.post("/register", upload.single("pic"), async (req, res) => {
    try {
        let { name, username, email, role, active, password, mobile } = req.body;
        let pic;

        if (req.file) {
            pic = req.file.filename;   // originalname ke jagah filename use karna better hai
        } else {
            return res.status(400).json({ message: "pic is Required" });
        }

        let existuser = await User.findOne({ email });
        if (existuser) {
            return res.status(400).json({ message: "User already exist!" });
        }

        const user = await User.create({ name, username, email, role, active, password, mobile, pic });


        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        console.error("Register Error:", err); // 👈 error console pe print kar
        return res.status(500).json({ err, message: "Internal Server problem" });
    }
});

userRouter.post("/logout", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(400).json({ msg: "Token missing" });

        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            return res.status(400).json({ msg: "Invalid token or expiry missing" });
        }

        const expiresAt = new Date(decoded.exp * 1000);
        if (isNaN(expiresAt.getTime())) {
            return res.status(400).json({ msg: "Invalid expiry date in token" });
        }

        await Blacklist.create({ token, expiresAt });

        res.json({ msg: "Logged out successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: err.message });
    }
});

userRouter.patch("/forget", upload.none(), async (req, res) => {
    try {
        const { username, password } = req.body;

        const existuser = await User.findOne({ username });
        if (!existuser) {
            return res.status(404).json({ message: "User not found" });
        }

        existuser.password = password;
        await existuser.save();

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


userRouter.post("/login", async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await User.findOne({
            $or: [
                { email: username },
                { username: username }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user, message: "login Sucessfully" });

    } catch (err) {
        return res.status(500).json({ message: "internal server problem" })
    }
})

userRouter.get("/get", async (req, res) => {
    try {
        const data = await User.find();
        if (!data) return res.status(404).json({ message: "data not found" })
        else return res.status(200).json({ data: data, message: "data found" });
    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
})

userRouter.get("/get/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id });
        if (data.pic) {
            data.pic = `http://localhost:8090/users/${data.pic}`
        }
        if (!data) return res.status(404).json({ message: "data not found" })
        else return res.status(200).json({ data: data, message: "data found" });
    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
})
userRouter.put("/update/:id", upload.single("pic"), async (req, res) => {
    try {
        const id = req.params.id;
        const updateddata = { ...req.body }

        const existdata = await User.findById(id)
        if (!existdata) {
            return res.status(404).json({ message: "User Not Found" });
        }
        if (req.file) {
            updateddata.pic = req.file.filename
        } else {
            updateddata.pic = existdata.pic
        }

        updateddata.name = updateddata.name ? updateddata.name : existdata.name
        updateddata.username = updateddata.username ? updateddata.username : existdata.username
        updateddata.email = updateddata.email ? updateddata.email : existdata.email
        updateddata.role = updateddata.role ? updateddata.role : existdata.role
        updateddata.active = updateddata.active ? updateddata.active : existdata.active
        updateddata.password = updateddata.password ? updateddata.password : existdata.password
        updateddata.address = updateddata.address ? updateddata.address : existdata.address
        updateddata.mobile = updateddata.mobile ? updateddata.mobile : existdata.mobile

        const update = await User.findByIdAndUpdate(id, updateddata, {
            new: true,
            runValidators: true,
        })

        if (!update) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(404).json({ message: "data update sucessfully" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "internal server error" })
    }

})

userRouter.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedata = await User.findByIdAndDelete(id);
        if (!deletedata) {
            return res.status(404).json({ message: "data not found" });
        } else {
            return res.status(200).json({ message: "data deleted Sucessfully" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Inter server error" })
    }
})
export default userRouter;
import express from "express";
import User from "../Models/userSchema.js";
import Blacklist from "../Models/Blicklisttoken.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    try {
        const { name, username, email, role, active, password, mobile } = req.body;
        let existuser = await User.findOne({ email });
        if (existuser) {
            return res.status(400).json({ message: "User already exist!" })
        }

        const user = await User.create({ name, username, email, role, active, password, mobile })
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ message: "User creates sucessfully" });

    } catch (err) {
        return res.status(500).json({ message: "Internal Server problem" })
    }

})

userRouter.post("/logout", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(400).json({ msg: "Token missing" });

        const decoded = jwt.decode(token);
        const expiresAt = new Date(decoded.exp * 1000); // convert exp to milliseconds

        await Blacklist.create({ token, expiresAt });

        res.json({ msg: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})
userRouter.get("/login", async (req, res) => {
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
        res.json({ token, user });

    } catch (err) {
        return res.status(500).json({ message: "internal server problem" })
    }
})

export default userRouter;
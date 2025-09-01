import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name must be less than 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    subject: {
        type: String,
        required: [true, "Subject is required"],
        trim: true,
        maxlength: [100, "Subject must be less than 100 characters"]
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        trim: true,
        minlength: [10, "Message must be at least 10 characters long"],
        maxlength: [50, "Message must be less than 50 characters"]
    },
}, {
    timestamps: true 
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;

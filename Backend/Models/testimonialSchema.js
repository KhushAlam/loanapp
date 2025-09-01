import mongoose from "mongoose";

const testimonialSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [30, "Name cannot exceed 30 characters"],
        trim: true
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true
    },
    pic: {
        type: String,
        required: [true, "Picture is required"]
    },
    active: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [10, "Description must be at least 10 characters"],
        maxlength: [50, "Description cannot exceed 50 characters"],
        trim: true
    }
}, { timestamps: true });

const Tesitimonial = mongoose.model("Tesitimonial", testimonialSchema);
export default Tesitimonial;

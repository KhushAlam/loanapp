import mongoose from "mongoose";

const servicesSchema = mongoose.Schema({
    loantype: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    interest: {
        type: Number,
        required: true,
        min: [8, "Interest must be at least 8%"],
        max: [12, "Interest cannot exceed 12%"],
    },
    duration: {
        type: Number,
        required: true,
        min: [1, "Duration must be at least 1 month"],
        max: [72, "Duration cannot exceed 72 months"],
    },
    installment: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true
    },
    eligibility: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    }
});

const Services = mongoose.model("Services", servicesSchema);
export default Services;

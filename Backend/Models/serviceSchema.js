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
    },
    duration: {
        type: Number,
        required: true,
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
})


const Services = mongoose.model("Services", servicesSchema);
export default Services;
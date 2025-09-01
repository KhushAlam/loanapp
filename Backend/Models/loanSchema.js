import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
    loantype: {
        type: String,
        required: [true, "Loan type is required"],
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [1000, "Amount must be at least 1000"],
    },
    duration: {
        type: Number,
        required: [true, "Duration is required"],
        min: [1, "Duration must be at least 1 month"],
        max:[72,"Duration must be less then equl to 72"]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
         minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name must be less than 50 characters"],
        trim: true
    },
    fname: {
        type: String,
        required: [true, "Father's name is required"],
         minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name must be less than 50 characters"],
        trim: true
    },
    mname: {
        type: String,
         minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name must be less than 50 characters"],
        trim: true
    },
    aadhar: {
        type: String,
        required: [true, "Aadhar number is required"],
        unique: true,
        match: [/^\d{12}$/, "Aadhar must be 12 digits"]
    },
    mobile: {
        type: String,
        required: [true, "Mobile number is required"],
        match: [/^\d{10}$/, "Mobile number must be 10 digits"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    bankn: {
        type: String,
        required: [true, "Bank name is required"],
        trim: true
    },
    ifsc: {
        type: String,
        required: [true, "IFSC is required"],
        uppercase: true,
        match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"]
    },
    account: {
        type: String,
        required: [true, "Account number is required"],
        trim: true
    },
    workingtype: {
        type: String,
        required: [true, "Working type is required"],
        enum:["Student","Self Employed","Businessman"],
        trim: true
    },
    income: {
        type: Number,
        required: [true, "Income is required"],
        min: [15000, "Income cannot be negative or lessthan 15000"]
    },
    address: {
        type: String,
        required: [true, "Address is required"],
         minlength: [5, "Name must be at least 5 words long"],
        maxlength: [60, "Name must be less than 60 characters"],
        trim: true
    },
    pic: {
        type: String,
        required: [true, "Profile picture is required"],
    },
    salaryslip: {
        type: String,
        required: [true, "Salary slip is required"]
    },
    bankpassbook: {
        type: String,
        required: [true, "Bank passbook is required"]
    },
    aadharcard: {
        type: String,
        required: [true, "Aadhar card is required"]
    },
    pancard: {
        type: String,
        required: [true, "PAN card is required"]
    },
    status: {
        type: String,
        default: "Submitted",
        enum: ["Submitted", "Approved", "Rejected","Paid"]
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;

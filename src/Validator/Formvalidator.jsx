import React from 'react'
const PasswordValidator = require('password-validator');
const schema = new PasswordValidator()
    .is().min(8).is().max(64)
    .has().uppercase().has().lowercase()
    .has().digits().has().symbols()
    .has().not().spaces();

export default function Formvalidator(e) {

    let { name, value } = e.target;
    switch (name) {
        case "password":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            }
            const ok = schema.validate(value);
            if (!ok) {
                const failures = schema.validate(value, { list: true });
                return "Password must be contain a spacial character one upper case one Lower case and one number password length minimum 8 character"
            }
            else {
                return ""
            }
        case "message":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            } else if (value.length < 30) {
                return "massege should be Atleast 30 word..."
            } else {
                return ""
            }
        case "subject":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            } else if (value.length < 10) {
                return "massege should be Atleast 10 word..."
            } else {
                return ""
            }
        case "amount":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            }
            else if (value.length < 4 || value.length > 8) {
                return name + " must be greater 1000 and less 10000000 "
            }
            else {
                return ""
            }
        case "role":
            if (value && value.length === 0) {
                return name + "Feild is Mandatory"
            } else {
                return ""
            }
        case "work":
            if (value && value.length) {
                return name + " Felid is Mandatory"
            }
            else if (value.length < 4) {
                return "Length must greater than 4 character"
            }
            else {
                return ""
            }

        case "interest":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            }
            else if (value < 8 || value > 14) {
                return name + " must be in b/w 8 to 13"
            }
            else {
                return ""
            }

        case "duration":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            }
            else if (value <= 0) {
                return name + " Please enter positive Number only Number must be greater than 0"
            }
            else if (value < 3 || value > 72) {
                return name + "  must 3 to 72 months"
            }
            else {
                return ""
            }

        case "installment":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            }
            else if (value < 500 || value > 60000) {
                return name + " must 500 to 60000"
            }
            else {
                return ""
            }

        case "total":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            }
            else {
                return ""
            }

        case "eligibility":
        case "address":
        case "discription":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            }
            else if (value.length < 20) {
                return name + " lenght must be greater than 50 characters "
            }
            else {
                return ""
            }

        case "loantype":
        case "active":

            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            }
            else {
                return ""
            }

        case "city":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            }
            else if (value.length < 3) {
                return name + " Name must greater than 3 character's"
            }
            else {
                return ""
            }
        case "name":
        case "fname":
        case "mname":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            }
            else if (value.length < 3 || value.length > 30) {
                return name + " lenght must be 3 to 30 characters "
            }
            else {
                return ""
            }

        case "aadhar":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            }
            else if (value.length !== 12) {
                return name + " lenght must be 12 numebrs "
            }
            else {
                return ""
            }

        case "mobile":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            }
            else if (value.length !== 10) {
                return name + " lenght must be 10 Numbers "
            }
            else if (value[0] === 1 || value[0] === 0 || value[0] === 2 || value[0] === 3 || value[0] == 4 || value[0] == 5) {
                return "Mobile number not start with 0,1,2,3,4,5"
            }
            else {
                return ""
            }

        case "email":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            }
            else if (value.length < 13) {
                return name + " must be 13 character "
            }
            else {
                return ""
            }

        case "bankn":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            }
            else if (value.length < 8) {
                return name + " must be more then 8 character "
            }
            else {
                return ""
            }

        case "income":
            if (value && value.length === 0) {
                return name + " Feild is Mandatory"
            } else {
                return ""
            }

        case "workingtype":
            if (value && value.lengh === 0) {
                return name + " Feild is Mandatory"
            } else {
                return ""
            }
        case "account":
            if (value && value === 0) {
                return name + " Feild is Mandatory"
            }
            else if (value.length < 10 || value.length > 16) {
                return "Please enter valid account number"
            } else {
                return ""
            }
        case "ifsc":
            if (value && value === 0) {
                return name + " Feild is Mandatory"
            }
            else if (value.length < 10 || value.length > 16) {
                return "Please enter valid ifsc code"
            } else {
                return ""
            }
        default:
            return ""
    }
}

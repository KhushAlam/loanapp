import { all } from "redux-saga/effects";
import loanSagas from "./LoanSagas";
import serviceSagas from "./ServicesSagas";
import testimonialSagas from "./TestimonialSagas";
// import loanSagas from "./LoanSagas";
import teamSagas from "./TeamSagas";
import contactSagas from "./ContactSagas";
import usersSagas from "./UsersSagas";
import paymentSagas from "./PaymentSagas";
import repaymentSagas from "./RepaymentSagas";

export default function* Rootsagas() {
    yield all([
        loanSagas(),
        serviceSagas(),
        testimonialSagas(),
        teamSagas(),
        contactSagas(),
        usersSagas(),
        paymentSagas(),
        repaymentSagas()
    ])
}
import { combineReducers } from "redux";
import Loanreducer from "./Loanreducer";
import Servicesreducer from "./Servicesreducer";
import Testimonialreducer from "./Testimonialreducer";
import Teamreducer from "./Teamreducer";
import Contactreducer from "./Contactreducer";
import Usersreducer from "./Usersreducer";
import Paymentreducer from "./Paymentreducer";
import Repaymentreducer from "./Repaymentreducer";

export default combineReducers({
    loanStatedata: Loanreducer,
    serviceStatedata: Servicesreducer,
    testimonialStatedata: Testimonialreducer,
    teamStatedata: Teamreducer,
    contactStatedata: Contactreducer,
    usersStatedata: Usersreducer,
    paymentStatedata: Paymentreducer,
    repaymentStatedata: Repaymentreducer,
})

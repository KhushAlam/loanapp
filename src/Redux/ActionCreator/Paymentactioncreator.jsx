import React from 'react';
import { CREATE_PAYMENT, DELETE_PAYMENT, GET_PAYMENT, UPDATE_PAYMENT } from "../Constent"

export  function Createpayment(data) {
    return {
        type: CREATE_PAYMENT,
        payload: data,
    }
}

export  function Getpayment() {
    return {
        type: GET_PAYMENT,
    }
}

export  function Updatepayment(data) {
    return {
        type: UPDATE_PAYMENT,
        payload: data
    }
}

export  function Deletepayment(data) {
    return {
        type: DELETE_PAYMENT,
        payload: data
    }
}
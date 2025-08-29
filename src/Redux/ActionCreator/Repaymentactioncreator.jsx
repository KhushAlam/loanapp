import React from 'react';
import { CREATE_REPAYMENT, DELETE_REPAYMENT, GET_REPAYMENT, UPDATE_REPAYMENT } from "../Constent"

export  function Createrepayment(data) {
    return {
        type: CREATE_REPAYMENT,
        payload: data,
    }
}

export  function Getrepayment() {
    return {
        type: GET_REPAYMENT,
    }
}

export  function Updaterepayment(data) {
    return {
        type: UPDATE_REPAYMENT,
        payload: data
    }
}

export  function Deleterepayment(data) {
    return {
        type: DELETE_REPAYMENT,
        payload: data
    }
}
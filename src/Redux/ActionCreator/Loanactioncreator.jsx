import React from 'react';
import { CREATE_LOAN, DELETE_LOAN, GET_LOAN, UPDATE_LOAN } from "../Constent"

export  function Createloan(data) {
    return {
        type: CREATE_LOAN,
        payload: data,
    }
}

export  function Getloan() {
    return {
        type: GET_LOAN,
    }
}

export  function Updateloan(data) {
    return {
        type: UPDATE_LOAN,
        payload: data
    }
}

export  function Deleteloan(data) {
    return {
        type: DELETE_LOAN,
        payload: data
    }
}
import React from 'react';
import { CREATE_CONTACT, DELETE_CONTACT, GET_CONTACT, UPDATE_CONTACT } from "../Constent"

export  function Createcontact(data) {
    return {
        type: CREATE_CONTACT,
        payload: data,
    }
}

export  function Getcontact() {
    return {
        type: GET_CONTACT,
    }
}

export  function Updatecontact(data) {
    return {
        type: UPDATE_CONTACT,
        payload: data
    }
}

export  function Deletecontact(data) {
    return {
        type: DELETE_CONTACT,
        payload: data
    }
}
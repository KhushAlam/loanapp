import React from 'react';
import { CREATE_USERS, DELETE_USERS, GET_USERS, UPDATE_USERS } from "../Constent"

export  function Createusers(data) {
    return {
        type: CREATE_USERS,
        payload: data,
    }
}

export  function Getusers() {
    return {
        type: GET_USERS,
    }
}

export  function Updateusers(data) {
    return {
        type: UPDATE_USERS,
        payload: data
    }
}

export  function Deleteusers(data) {
    return {
        type: DELETE_USERS,
        payload: data
    }
}
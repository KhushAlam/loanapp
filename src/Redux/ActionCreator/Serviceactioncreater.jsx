import React from 'react';
import { CREATE_SERVICES, DELETE_SERVICES, GET_SERVICES, UPDATE_SERVICES } from "../Constent"

export default function Createservice(data) {
    return {
        type: CREATE_SERVICES,
        payload: data,
    }
}

export  function Getservice() {
    return {
        type: GET_SERVICES,
    }
}

export  function Updateservice(data) {
    return {
        type: UPDATE_SERVICES,
        payload: data
    }
}

export  function Deleteservice(data) {
    return {
        type: DELETE_SERVICES,
        payload: data
    }
}
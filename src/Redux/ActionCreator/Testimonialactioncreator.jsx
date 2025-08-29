import React from 'react';
import { CREATE_TESTIMONIAL, DELETE_TESTIMONIAL, GET_TESTIMONIAL, UPDATE_TESTIMONIAL } from "../Constent"

export  function Createtestimonial(data) {
    return {
        type: CREATE_TESTIMONIAL,
        payload: data,
    }
}

export  function Gettestimonial() {
    return {
        type: GET_TESTIMONIAL,
    }
}

export  function Updatetestimonial(data) {
    return {
        type: UPDATE_TESTIMONIAL,
        payload: data
    }
}

export  function Deletetestimonial(data) {
    return {
        type: DELETE_TESTIMONIAL,
        payload: data
    }
}
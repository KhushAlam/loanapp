import React from 'react'
import { CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL_RED } from "../Constent"

export default function Testimonialreducer(state = [], action) {
    switch (action.type) {
        case CREATE_TESTIMONIAL_RED:
            return [...state, action.payload]
        case GET_TESTIMONIAL_RED:
            return action.payload
        case UPDATE_TESTIMONIAL_RED:
            let index = state.findIndex((x) => x.id === action.payload.id);
            state[index] = action.payload.name
            state[index] = action.payload.fathername;
            state[index] = action.payload.pic;
            state[index] = action.payload.active;
            return state
        case DELETE_TESTIMONIAL_RED:
            return state.filter((x) => x.id !== action.payload.id)

        default:
            return state
    }

}

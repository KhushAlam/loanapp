import React from 'react'
import { CREATE_PAYMENT_RED, DELETE_PAYMENT_RED, GET_PAYMENT_RED, UPDATE_PAYMENT_RED } from "../Constent"

export default function Paymentreducer(state = [], action) {
    switch (action.type) {
        case CREATE_PAYMENT_RED:
            return [...state, action.payload]
        case GET_PAYMENT_RED:
            return action.payload
        case UPDATE_PAYMENT_RED:
            let index = state.findIndex((x) => x.id === action.payload.id);
            state[index] = action.payload.name
            state[index] = action.payload.fathername;
            state[index] = action.payload.pic;
            state[index] = action.payload.active;
            return state
        case DELETE_PAYMENT_RED:
            return state.filter((x) => x.id !== action.payload.id)

        default:
            return state
    }

}

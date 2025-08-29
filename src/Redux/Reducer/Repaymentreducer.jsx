import React from 'react'
import { CREATE_REPAYMENT_RED, DELETE_REPAYMENT_RED, GET_REPAYMENT_RED, UPDATE_REPAYMENT_RED } from "../Constent"

export default function Repaymentreducer(state = [], action) {
    switch (action.type) {
        case CREATE_REPAYMENT_RED:
            return [...state, action.payload]
        case GET_REPAYMENT_RED:
            return action.payload
        case UPDATE_REPAYMENT_RED:
            let index = state.findIndex((x) => x.id === action.payload.id);
            state[index] = action.payload.name
            state[index] = action.payload.fathername;
            state[index] = action.payload.pic;
            state[index] = action.payload.active;
            return state
        case DELETE_REPAYMENT_RED:
            return state.filter((x) => x.id !== action.payload.id)

        default:
            return state
    }

}

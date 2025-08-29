import React from 'react'
import { CREATE_LOAN_RED, DELETE_LOAN_RED, GET_LOAN_RED, UPDATE_LOAN_RED } from "../Constent"

export default function Loanreducer(state = [], action) {
    switch (action.type) {
        case CREATE_LOAN_RED:
            return [...state, action.payload]
        case GET_LOAN_RED:
            return action.payload
        case UPDATE_LOAN_RED:
            let index = state.findIndex((x) => x.id === action.payload.id);
            state[index] = action.payload.name
            state[index] = action.payload.fathername;
            state[index] = action.payload.pic;
            state[index] = action.payload.active;
            return state
        case DELETE_LOAN_RED:
            return state.filter((x) => x.id !== action.payload.id)

        default:
            return state
    }

}

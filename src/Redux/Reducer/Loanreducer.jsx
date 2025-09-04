import React from 'react'
import { CREATE_LOAN_RED, DELETE_LOAN_RED, GET_LOAN_RED, UPDATE_LOAN_RED } from "../Constent"

export default function Loanreducer(state = [], action) {
    switch (action.type) {
        case CREATE_LOAN_RED:
            return [...state, action.payload]
        case GET_LOAN_RED:
            return action.payload.data
        case UPDATE_LOAN_RED:
            return state.map((x) =>
                x._id === action.payload._id ? { ...x, ...action.payload } : x
            );
        case DELETE_LOAN_RED:
            return state.filter((x) => x._id !== action.payload._id)

        default:
            return state
    }

}

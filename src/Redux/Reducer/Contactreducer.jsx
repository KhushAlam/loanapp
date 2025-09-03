import React from 'react'
import { CREATE_CONTACT_RED, DELETE_CONTACT_RED, GET_CONTACT_RED, UPDATE_CONTACT_RED } from "../Constent"

export default function Contactreducer(state = [], action) {
    switch (action.type) {
        case CREATE_CONTACT_RED:
            return [...state, action.payload]
        case GET_CONTACT_RED:
            return action.payload.data
        case UPDATE_CONTACT_RED:
            return state.map((x) =>
                x._id === action.payload._id ? { ...x, ...action.payload } : x
            );
        case DELETE_CONTACT_RED:
            return state.filter((x) => x._id !== action.payload._id)

        default:
            return state
    }

}

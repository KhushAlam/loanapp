import React from 'react'
import { CREATE_CONTACT_RED, DELETE_CONTACT_RED, GET_CONTACT_RED, UPDATE_CONTACT_RED } from "../Constent"

export default function Contactreducer(state = [], action) {
    switch (action.type) {
        case CREATE_CONTACT_RED:
            return [...state, action.payload]
        case GET_CONTACT_RED:
            return action.payload
        case UPDATE_CONTACT_RED:
            let index = state.findIndex((x) => x.id === action.payload.id);
            state[index] = action.payload.name
            state[index] = action.payload.fathername;
            state[index] = action.payload.pic;
            state[index] = action.payload.active;
            return state
        case DELETE_CONTACT_RED:
            return state.filter((x) => x.id !== action.payload.id)

        default:
            return state
    }

}

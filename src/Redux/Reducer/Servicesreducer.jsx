import React from 'react'
import { CREATE_SERVICES_RED, DELETE_SERVICES_RED, GET_SERVICES_RED, UPDATE_SERVICES_RED } from "../Constent"

export default function Servicesreducer(state = [], action) {
    switch (action.type) {
        case CREATE_SERVICES_RED:
            return [...state, action.payload]
        case GET_SERVICES_RED:
            return action.payload
        case UPDATE_SERVICES_RED:
            let index = state.findIndex((x) => x.id === action.payload.id);
            state[index] = action.payload.name
            state[index] = action.payload.fathername;
            state[index] = action.payload.pic;
            state[index] = action.payload.active;
            return state
        case DELETE_SERVICES_RED:
            return state.filter((x) => x.id !== action.payload.id)

        default:
            return state
    }

}

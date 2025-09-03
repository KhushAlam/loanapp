import React from 'react'
import { CREATE_SERVICES_RED, DELETE_SERVICES_RED, GET_SERVICES_RED, UPDATE_SERVICES_RED } from "../Constent"

export default function Servicesreducer(state = [], action) {
    switch (action.type) {
        case CREATE_SERVICES_RED:
            return [...state, action.payload]
        case GET_SERVICES_RED:
            return action.payload.data
        case UPDATE_SERVICES_RED:
            return state.map((x) =>
                x._id === action.payload._id ? { ...x, ...action.payload } : x
            );
        case DELETE_SERVICES_RED:
            return state.filter((x) => x._id !== action.payload._id);

        default:
            return state
    }

}

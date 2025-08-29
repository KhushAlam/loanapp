import React from 'react'
import { CREATE_USERS_RED, DELETE_USERS_RED, GET_USERS_RED, UPDATE_USERS_RED } from "../Constent"

export default function Usersreducer(state = [], action) {
    switch (action.type) {
        case CREATE_USERS_RED:
            return [...state, action.payload]
        case GET_USERS_RED:
            return action.payload
        case UPDATE_USERS_RED:
            let index = state.findIndex((x) => x.id === action.payload.id);
            state[index] = action.payload.name
            state[index] = action.payload.fathername;
            state[index] = action.payload.pic;
            state[index] = action.payload.active;
            return state
        case DELETE_USERS_RED:
            return state.filter((x) => x.id !== action.payload.id)

        default:
            return state
    }

}

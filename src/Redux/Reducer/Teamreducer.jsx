import React from 'react'
import { CREATE_TEAM_RED, DELETE_TEAM_RED, GET_TEAM_RED, UPDATE_TEAM_RED } from "../Constent"

export default function Teamreducer(state = [], action) {
    switch (action.type) {
        case CREATE_TEAM_RED:
            return [...state, action.payload]
        case GET_TEAM_RED:
            return action.payload
        case UPDATE_TEAM_RED:
            let index = state.findIndex((x) => x.id === action.payload.id);
            state[index] = action.payload.name
            state[index] = action.payload.fathername;
            state[index] = action.payload.pic;
            state[index] = action.payload.active;
            return state
        case DELETE_TEAM_RED:
            return state.filter((x) => x.id !== action.payload.id)

        default:
            return state
    }

}

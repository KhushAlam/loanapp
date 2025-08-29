import React from 'react';
import { CREATE_TEAM, DELETE_TEAM, GET_TEAM, UPDATE_TEAM } from "../Constent"

export  function Createteam(data) {
    return {
        type: CREATE_TEAM,
        payload: data,
    }
}

export  function Getteam() {
    return {
        type: GET_TEAM,
    }
}

export  function Updateteam(data) {
    return {
        type: UPDATE_TEAM,
        payload: data
    }
}

export  function Deleteteam(data) {
    return {
        type: DELETE_TEAM,
        payload: data
    }
}
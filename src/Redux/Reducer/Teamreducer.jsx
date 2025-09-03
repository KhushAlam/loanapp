import { CREATE_TEAM_RED, DELETE_TEAM_RED, GET_TEAM_RED, UPDATE_TEAM_RED } from "../Constent";

export default function Teamreducer(state = [], action) {
    switch (action.type) {
        case CREATE_TEAM_RED:
            return [...state, action.payload];

        case GET_TEAM_RED:
            return action.payload.data;

        case UPDATE_TEAM_RED:
            return state.map((x) =>
                x._id === action.payload._id ? { ...x, ...action.payload } : x
            );

        case DELETE_TEAM_RED:
            return state.filter((x) => x._id !== action.payload._id);

        default:
            return state;
    }
}

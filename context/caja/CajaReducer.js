import {SET_CAJA} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case SET_CAJA:
            return {
                ...state,
                caja: action.payload
            }
        default:
            return state;
    }
}
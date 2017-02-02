import {ADD_ERROR, REMOVE_ERROR} from "../constants/actionNames"
import _ from "lodash"

export default function errors(state = [], action) {

    switch (action.type) {
        case ADD_ERROR:
            return [action.error, ...state];
            break;
        case REMOVE_ERROR:
            return _.filter(state, el => el != action.error)
            break;
        default:
            return state
    }
}

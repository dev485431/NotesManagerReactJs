import {ADD_FOLDER, REMOVE_FOLDER} from "../constants/actionNames"
import _ from "lodash"

export default function folders(state = [], action) {

    switch (action.type) {
        case ADD_FOLDER:
            return [action.folder, ...state];
            break;
        case REMOVE_FOLDER:
            return _.filter(state, el => el != action.folder.id)
            break;
        default:
            return state
    }
}
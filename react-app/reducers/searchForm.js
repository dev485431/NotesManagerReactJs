import {SET_SEARCH_RESULT, CLEAR_SEARCH_RESULT} from "../constants/actionNames"

let initState = {notes: []};

export default function searchForm(state = initState, action) {

    switch (action.type) {
        case SET_SEARCH_RESULT:
            return Object.assign({}, state, {
                notes: action.notes
            });
            break;
        case CLEAR_SEARCH_RESULT:
            return Object.assign({}, state, {
                notes: []
            });
            break;
        default:
            return state
    }
}
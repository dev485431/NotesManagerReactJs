import {OPEN_NOTE_DETAILS, CLOSE_NOTE_DETAILS} from "../constants/actionNames"

let initState = {openNoteDetailsFlag: false};

export default function noteList(state = initState, action) {

    switch (action.type) {
        case OPEN_NOTE_DETAILS:
            return Object.assign({}, state, {
                openNoteDetailsFlag: true
            });
            break;
        case CLOSE_NOTE_DETAILS:
            return Object.assign({}, state, {
                openNoteDetailsFlag: false
            });
            break;

        default:
            return state
    }
}

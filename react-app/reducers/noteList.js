import {ADD_NOTE, REMOVE_NOTE, SET_NOTES, SET_ACTIVE_NOTE} from "../constants/actionNames"
import {LOADED, NOT_LOADED, CLEAR} from "../constants/noteListState"
import _ from "lodash"

let initState = {notes: [], status: NOT_LOADED, activeNoteId: null};

export default function noteList(state = initState, action) {

    switch (action.type) {
        case ADD_NOTE:
            return Object.assign({}, state, {
                notes: [...state.notes, action.note]
            });
            break;
        case REMOVE_NOTE:
            return Object.assign({}, state, {
                notes: _.filter(state.notes, el => el.id != action.noteId)
            });
            break;
        case SET_NOTES:
            return Object.assign({}, state, {
                notes: action.notes,
                status: LOADED
            });
            break;
        case SET_ACTIVE_NOTE:
            return Object.assign({}, state, {
                activeNoteId: action.activeNoteId
            });
            break;
        default:
            return state
    }
}
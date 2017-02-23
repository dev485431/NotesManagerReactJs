import {ADD_NOTE, REMOVE_NOTES, SET_FETCHED_NOTES, SET_UPDATED_NOTES, SET_ACTIVE_NOTE, SET_NOTE} from "../constants/actionNames"
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
        case REMOVE_NOTES:
            return Object.assign({}, state, {
                notes: _.filter(state.notes, el => !action.noteIds.includes(el.id))
            });
            break;
        case SET_FETCHED_NOTES:
            return Object.assign({}, state, {
                notes: _.sortBy(action.notes, note => note.position),
                status: LOADED
            });
            break;
        case SET_UPDATED_NOTES:
            let notes = state.notes.slice();
            action.notes.map(note => {
                let match = _.find(notes, el => el.id == note.id);
                if (match) {
                    let index = _.indexOf(notes, match);
                    notes.splice(index, 1, note);
                }
            })
            return Object.assign({}, state, {
                notes: notes
            });
            break;
        case SET_ACTIVE_NOTE:
            return Object.assign({}, state, {
                activeNoteId: action.activeNoteId
            });
            break;
        case SET_NOTE:
            let updatedNotes = state.notes.slice();
            let match = _.find(updatedNotes, el => el.id == action.note.id);
            if (match) {
                let index = _.indexOf(updatedNotes, match);
                updatedNotes.splice(index, 1, action.note);
            }
            return Object.assign({}, state, {
                notes: updatedNotes
            });
            break;
        default:
            return state
    }
}
import {addError} from "../actions/errors"
import {ADD_NOTE, REMOVE_NOTE, SET_NOTES, SET_ACTIVE_NOTE} from "../constants/actionNames"

import axios from "axios"

export function addNote(note) {
    return {
        type: ADD_NOTE,
        note
    }
}

export function removeNote(noteId) {
    return {
        type: REMOVE_NOTE,
        noteId
    }
}

export function setNotes(notes) {
    return {
        type: SET_NOTES,
        notes
    }
}

export function setActiveNote(activeNoteId) {
    return {
        type: SET_ACTIVE_NOTE,
        activeNoteId
    }
}

// api calls
export function fetchNotes(dispatch) {
    axios.get("/notices")
        .then(function (data) {
            dispatch(setNotes(data.data))
        })
        .catch(function (err) {
            dispatch(addError(err.response.data))
        })
}

export function saveNote(directoryId, title, description, tags, dispatch) {
    axios.post("/notices", {
        directoryId: directoryId,
        title: title,
        description: description,
        tags: tags
    })
        .then(function (data) {
            let note = {
                id: data.data.id,
                position: data.data.position,
                directoryId: directoryId,
                title: title,
                description: description,
                tags: tags
            };
            dispatch(addNote(note))
        })
        .catch(function (err) {
            dispatch(addError(err.response.data))
        })
}

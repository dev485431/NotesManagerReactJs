import {addError} from "../actions/errors"
import {ADD_NOTE, REMOVE_NOTES, SET_NOTES, SET_ACTIVE_NOTE, SET_NOTE} from "../constants/actionNames"

import axios from "axios"

export function addNote(note) {
    return {
        type: ADD_NOTE,
        note
    }
}

export function removeNotes(noteIds) {
    return {
        type: REMOVE_NOTES,
        noteIds
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

export function setNote(note) {
    return {
        type: SET_NOTE,
        note
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

export function deleteNotes(noteIds, dispatch) {
    let deleteRequests = [];
    noteIds.map(noteId => {
        deleteRequests.push(deleteNote(noteId));
    })
    axios.all(deleteRequests)
        .then(function () {
            dispatch(removeNotes(noteIds))
        })
        .catch(function (err) {
            dispatch(addError(err.response.data))
        })
}

function deleteNote(noteId) {
    return axios.delete("/notices/" + noteId)
}

export function updateNote(noteId, note, dispatch) {
    axios.post("/notices/" + noteId, {
        directoryId: note.directoryId,
        title: note.title,
        description: note.description,
        tags: note.tags,
        position: note.position
    })
        .then(function (data) {
            let note = {
                id: data.data.id,
                position: data.data.position,
                directoryId: data.data.directoryId,
                title: data.data.title,
                description: data.data.description,
                tags: data.data.tags
            };
            dispatch(setNote(note))
        })
        .catch(function (err) {
            dispatch(addError(err.response.data))
        })
}
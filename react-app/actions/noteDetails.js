import {OPEN_NOTE_DETAILS, CLOSE_NOTE_DETAILS} from "../constants/actionNames"


export function setOpen() {
    return {
        type: OPEN_NOTE_DETAILS
    }
}

export function setClose() {
    return {
        type: CLOSE_NOTE_DETAILS
    }
}

export function openNoteDetails(dispatch) {
    dispatch(setOpen())
}

export function closeNoteDetails(dispatch) {
    dispatch(setClose())
}

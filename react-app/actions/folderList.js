import {addError} from "../actions/errors"
import {ADD_FOLDER, REMOVE_FOLDER, SET_FOLDERS_LIST} from "../constants/actionNames"

import axios from "axios"

// action creators; returned objects will be dispatch()ed and caught by reducers
export function addFolder(folder) {
    return {
        type: ADD_FOLDER,
        folder
    }
}

export function removeFolder(folder) {
    return {
        type: REMOVE_FOLDER,
        folder
    }
}

export function setFoldersList(folders) {
    return {
        type: SET_FOLDERS_LIST,
        folders
    }
}

// api calls
export function fetchFolders(dispatch) {
    axios.get("/directories")
        .then(function (data) {
            // dispatch action object
            dispatch(setFoldersList(data.data))
        })
        .catch(function (err) {

            dispatch(addError(err.response.data))
        })
}
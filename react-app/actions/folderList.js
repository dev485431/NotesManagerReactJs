import {addError} from "../actions/errors"
import {ADD_FOLDER, REMOVE_FOLDER, SET_FOLDERS_LIST, SET_ACTIVE_FOLDER} from "../constants/actionNames"

import axios from "axios"

// action creators; returned objects will be dispatch()ed and caught by reducers
export function addFolder(folder) {
    return {
        type: ADD_FOLDER,
        folder
    }
}

export function removeFolder(removedId) {
    return {
        type: REMOVE_FOLDER,
        removedId
    }
}

export function setFoldersList(folders) {
    return {
        type: SET_FOLDERS_LIST,
        folders
    }
}

export function setActiveFolder(activeId) {
    return {
        type: SET_ACTIVE_FOLDER,
        activeId
    }
}

// api calls
export function fetchFolders(dispatch) {
    axios.get("/directories")
        .then(function (data) {
            dispatch(setFoldersList(data.data))
        })
        .catch(function (err) {

            dispatch(addError(err.response.data))
        })
}

export function saveFolder(parentId, name, dispatch) {
    axios.post("/directories", {
        parentId: parentId,
        name: name
    })
        .then(function (data) {
            let folder = {
                id: data.data.id,
                parentId: parentId,
                name: name
            }
            dispatch(addFolder(folder))
        })
        .catch(function (err) {

            dispatch(addError(err.response.data))
        })
}
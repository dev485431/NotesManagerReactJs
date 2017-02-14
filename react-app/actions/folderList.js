import {addError} from "../actions/errors"
import {ADD_FOLDER, REMOVE_FOLDER, SET_FOLDERS, SET_ACTIVE_FOLDER, SET_OPEN_FOLDERS} from "../constants/actionNames"

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

export function setFolders(folders) {
    return {
        type: SET_FOLDERS,
        folders
    }
}

export function setActiveFolder(activeFolderId) {
    return {
        type: SET_ACTIVE_FOLDER,
        activeFolderId
    }
}

export function setOpenFolders(openFolderIds) {
    return {
        type: SET_OPEN_FOLDERS,
        openFolderIds
    }
}

// api calls
export function fetchFolders(dispatch) {
    axios.get("/directories")
        .then(function (data) {
            dispatch(setFolders(data.data))
        })
        .catch(function (err) {

            dispatch(addError(err.response.data))
        })
}

export function saveFolder(parentId, name, dispatch) {
    axios.post("/directories/", {
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

export function deleteFolder(folderId, dispatch) {
    axios.delete("/directories/" + folderId)
        .then(function (data) {
            console.log(data);
            // dispatch(addFolder(folder))
        })
        .catch(function (err) {

            dispatch(addError(err.response.data))
        })
}
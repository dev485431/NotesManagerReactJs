import {addError} from "../actions/errors"
import {
    ADD_FOLDER,
    REMOVE_FOLDERS,
    SET_FOLDERS,
    SET_ACTIVE_FOLDER,
    SET_OPEN_FOLDERS,
    SET_FOLDER
} from "../constants/actionNames"

import axios from "axios"

export function addFolder(folder) {
    return {
        type: ADD_FOLDER,
        folder
    }
}

export function removeFolders(folderIds) {
    return {
        type: REMOVE_FOLDERS,
        folderIds
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

export function setFolder(folder) {
    return {
        type: SET_FOLDER,
        folder
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

export function deleteFolders(folderIds, dispatch) {
    let deleteRequests = [];
    folderIds.map(folderId => {
        deleteRequests.push(deleteFolder(folderId));
    })
    axios.all(deleteRequests)
        .then(function () {
            dispatch(removeFolders(folderIds))
        })
        .catch(function (err) {
            dispatch(addError(err.response.data))
        })

}

function deleteFolder(folderId) {
    return axios.delete("/directories/" + folderId)
}

export function updateFolder(folder, dispatch) {
    axios.put("/directories/" + folder.id, {
        id: folder.id,
        parentId: folder.parentId,
        name: folder.name
    })
        .then(function (data) {
            let folder = {
                id: data.data.id,
                parentId: data.data.parentId,
                name: data.data.name
            };
            dispatch(setFolder(folder))
        })
        .catch(function (err) {
            dispatch(addError(err.response.data))
        })
}
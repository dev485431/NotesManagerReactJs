import {ADD_FOLDER, REMOVE_FOLDER} from "../constants/actionNames"


export function addFolder(folder) {
    return {
        type: ADD_FOLDER,
        folder
    }
}

export function removeError(folder) {
    return {
        type: REMOVE_FOLDER,
        folder
    }
}
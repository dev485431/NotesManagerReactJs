import {ADD_FOLDER, REMOVE_FOLDER, SET_FOLDERS_LIST, SET_ACTIVE_FOLDER} from "../constants/actionNames"
import {LOADED, NOT_LOADED, CLEAR} from "../constants/folderListState"
import _ from "lodash"

import {ROOT_FOLDER_ID} from "../constants/appSettings"

let initState = {folders: [], status: NOT_LOADED, activeFolderId: ROOT_FOLDER_ID};

export default function folderList(state = initState, action) {

    switch (action.type) {
        case ADD_FOLDER:
            return Object.assign({}, state, {
                folders: [...state.folders, action.folder]
            });
            break;
        case REMOVE_FOLDER:
            return Object.assign({}, state, {
                folders: _.filter(state.folders, el => el.id != action.removedId)
            });
            break;
        case SET_FOLDERS_LIST:
            return Object.assign({}, state, {
                folders: action.folders,
                status: LOADED
            });
            break;
        case SET_ACTIVE_FOLDER:
            return Object.assign({}, state, {
                activeFolderId: action.activeFolderId
            });
            break;
        default:
            return state
    }
}
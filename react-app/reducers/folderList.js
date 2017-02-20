import {ADD_FOLDER, REMOVE_FOLDERS, SET_FOLDERS, SET_ACTIVE_FOLDER, SET_OPEN_FOLDERS, SET_FOLDER} from "../constants/actionNames"
import {LOADED, NOT_LOADED, CLEAR} from "../constants/folderListState"
import _ from "lodash"

import {ROOT_FOLDER_ID} from "../constants/appSettings"

let initState = {folders: [], status: NOT_LOADED, activeFolderId: ROOT_FOLDER_ID, openFolderIds: []};

export default function folderList(state = initState, action) {

    switch (action.type) {
        case ADD_FOLDER:
            return Object.assign({}, state, {
                folders: [...state.folders, action.folder]
            });
            break;
        case REMOVE_FOLDERS:
            return Object.assign({}, state, {
                folders: _.filter(state.folders, el => !action.folderIds.includes(el.id))
            });
            break;
        case SET_FOLDERS:
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
        case SET_OPEN_FOLDERS:
            return Object.assign({}, state, {
                openFolderIds: action.openFolderIds
            });
            break;
        case SET_FOLDER:
            let updatedFolders = state.folders.slice();
            let match = _.find(updatedFolders, el => el.id == action.folder.id);
            if (match) {
                let index = _.indexOf(updatedFolders, match);
                updatedFolders.splice(index, 1, action.folder);
            }
            return Object.assign({}, state, {
                folders: updatedFolders
            });
            break;
        default:
            return state
    }
}
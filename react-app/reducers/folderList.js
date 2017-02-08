import {ADD_FOLDER, REMOVE_FOLDER, SET_FOLDERS_LIST} from "../constants/actionNames"
import {LOADED, NOT_LOADED, CLEAR} from "../constants/folderListState"
import _ from "lodash"

let initState = {folders: [], status: NOT_LOADED};

export default function folderList(state = initState, action) {

    switch (action.type) {
        case ADD_FOLDER:
            return {
                folders: [action.folder, ...state.folders],
                status: LOADED
            };
            break;
        case REMOVE_FOLDER:
            return {
                folders: _.filter(state.folders, el => el != action.folders.id),
                status: action.status
            };
            break;
        case SET_FOLDERS_LIST:
            return {
                folders: action.folders,
                status: LOADED
            };
            break;
        default:
            return state
    }
}
import {SET_SEARCH_RESULT, CLEAR_SEARCH_RESULT} from "../constants/actionNames"


export function setSearchResult(notes) {
    return {
        type: SET_SEARCH_RESULT,
        notes
    }
}

export function clearSearchResult() {
    return {
        type: CLEAR_SEARCH_RESULT
    }
}
import {ADD_ERROR, REMOVE_ERROR} from "../constants/actionNames"


export function addError(error) {
    return{
        type:ADD_ERROR,
        error
    }
}

export function removeError(error) {
    return{
        type:REMOVE_ERROR,
        error
    }
}
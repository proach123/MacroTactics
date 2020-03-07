import {
    SET_USER
} from '../actions'

const intialState = {
    userId: -1,
    properties: [],
    error: '',
    isFetchingData: false,
    updateProperties: []
};

export const gameReducer = (state = intialState, action)=>{
    switch(action.type) {
        case SET_USER:
        return {
            ...state,
            userId: action.payload
        }
    }
}
import {
    SEARCH_DATA_REQUEST,
    SEARCH_DATA_SUCCESS,
    SEARCH_DATA_ERROR,
    DELETE_DATA
} from '../constants';

const initialState = {
    results: [],
    loading: false,
    error: false
};

export default function(state = initialState, action ) {
    switch (action.type) {
        case SEARCH_DATA_REQUEST:
            return {
                ...state,
                loading: true
            };
        case SEARCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                results: action.payload
            };
        case SEARCH_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DELETE_DATA:
            return {
                ...state,
                loading: false,
                error: false,
                results: []
            };
        default:
            return state;
    }
}
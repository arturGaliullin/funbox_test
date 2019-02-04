import {
    ADD_PLACEMARK,
    REMOVE_PLACEMARK,
    GET_PLACEMARK_REQUEST,
    GET_PLACEMARK_SUCCESS,
    GET_PLACEMARK_ERROR,
    UPDATE_PLACEMARKS
} from '../constants';

const initialState = {
    placemarks: [],
    loading: false,
    error: false
};

export default function(state = initialState, action ) {
    switch (action.type) {
        case UPDATE_PLACEMARKS:
            return {
                ...state,
                placemarks: action.payload
            }
        case ADD_PLACEMARK:
            return {
                ...state,
                placemarks: [...state.placemarks, action.payload]
            };
        case REMOVE_PLACEMARK:
            return {
                ...state,
                placemarks: state.placemarks.filter(placemark => placemark.id !== action.payload)
            };
        case GET_PLACEMARK_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_PLACEMARK_SUCCESS:
            let index = state.placemarks.findIndex(placemark => placemark.id === action.payload.id);
            let placemarks = [...state.placemarks];
            placemarks[index] = {...placemarks[index], name: action.payload.name, coords: action.payload.coords};
            return {
                ...state,
                loading: false,
                error: false,
                placemarks: placemarks
            };
        case GET_PLACEMARK_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

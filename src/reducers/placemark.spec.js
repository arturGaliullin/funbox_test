import {
    ADD_PLACEMARK,
    REMOVE_PLACEMARK,
    GET_PLACEMARK_REQUEST,
    GET_PLACEMARK_SUCCESS,
    GET_PLACEMARK_ERROR,
    UPDATE_PLACEMARKS
} from '../constants';
import placemark from './placemark';

const state = {
    placemarks: [{id: 0, name: 'name', coords: [0, 0]}],
    loading: false,
    error: false
};

describe('placemark reducer', () => {
    it('UPDATE_PLACEMARKS', () => {
        const action = {
            type: UPDATE_PLACEMARKS,
            payload: []
        };

        expect(placemark(state, action)).toEqual({
            ...state,
            placemarks: action.payload
        });
    });

    it('ADD_PLACEMARK', () => {
        const action = {
            type: ADD_PLACEMARK,
            payload: {id: 1, name: 'name', coords: [1, 1]}
        };

        expect(placemark(state, action)).toEqual({
            ...state,
            placemarks: [...state.placemarks, action.payload]
        });
    });

    it('REMOVE_PLACEMARK', () => {
        const action = {
            type: REMOVE_PLACEMARK,
            payload: 0
        };

        expect(placemark(state, action)).toEqual({
            ...state,
            placemarks: state.placemarks.filter(placemark => placemark.id !== action.payload)
        });
    });

    it('GET_PLACEMARK_REQUEST', () => {
        const action = {
            type: GET_PLACEMARK_REQUEST
        };

        expect(placemark(state, action)).toEqual({
            ...state,
            loading: true
        });
    });

    it('GET_PLACEMARK_SUCCESS', () => {
        state.loading = false;

        const action = {
            type: GET_PLACEMARK_SUCCESS,
            payload: {id: 0, name: 'name', coords: [2, 3]}
        };

        let index = state.placemarks.findIndex(placemark => placemark.id === action.payload.id);
        let placemarks = [...state.placemarks];
        placemarks[index] = {...placemarks[index], name: action.payload.name, coords: action.payload.coords};

        expect(placemark(state, action)).toEqual({
            ...state,
            loading: false,
            error: false,
            placemarks: placemarks
        });
    });

    it('GET_PLACEMARK_ERROR', () => {
        state.loading = true;

        const action = {
            type: GET_PLACEMARK_ERROR,
            payload: 'Error'
        };

        expect(placemark(state, action)).toEqual({
            ...state,
            loading: false,
            error: action.payload
        });
    });
});

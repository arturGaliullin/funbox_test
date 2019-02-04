import {
    SEARCH_DATA_REQUEST,
    SEARCH_DATA_SUCCESS,
    SEARCH_DATA_ERROR,
    DELETE_DATA
} from '../constants';
import search from './search';

const state = {
    results: [],
    loading: false,
    error: false
};

describe('search reducer', () => {
    it('SEARCH_DATA_REQUEST', () => {
        const action = {
            type: SEARCH_DATA_REQUEST
        };

        expect(search(state, action)).toEqual({
            ...state,
            loading: true
        });
    });

    it('SEARCH_DATA_SUCCESS', () => {
        state.loading = true;

        const action = {
            type: SEARCH_DATA_SUCCESS,
            payload: [{id: 1, name: 'name'}, {id: 2, name: 'name'}]
        };

        expect(search(state, action)).toEqual({
            ...state,
            loading: false,
            error: false,
            results: action.payload
        });
    });

    it('SEARCH_DATA_ERROR', () => {
        state.loading = true;

        const action = {
            type: SEARCH_DATA_ERROR,
            payload: 'Error'
        };

        expect(search(state, action)).toEqual({
            ...state,
            loading: false,
            error: action.payload
        });
    });

    it('DELETE_DATA', () => {
        const action = {
            type: DELETE_DATA
        };

        expect(search(state, action)).toEqual({
            ...state,
            loading: false,
            error: false,
            results: []
        });
    });
});

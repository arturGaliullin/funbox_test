import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import configureStore from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('configureStore', () => {
    it('configureStore functions', () => {
        expect(configureStore({}).getState()).toEqual(
            {
                "placemark": {
                    "error": false,
                    "loading": false,
                    "placemarks": []
                },
                "search": {
                    "error": false,
                    "loading": false,
                    "results": []
                }
            }
        );
    });
});

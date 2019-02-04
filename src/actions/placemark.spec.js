import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
    ADD_PLACEMARK,
    REMOVE_PLACEMARK,
    GET_PLACEMARK_REQUEST,
    GET_PLACEMARK_SUCCESS,
    GET_PLACEMARK_ERROR,
    UPDATE_PLACEMARKS
} from '../constants';
import { updatePlacemarks, addPlacemark, getPlacemarkData, removePlacemark } from './placemark';
import {config} from "../config";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore({});

const data =  {
    response: {
        GeoObjectCollection: {
            featureMember: [
                {
                    GeoObject: {
                        metaDataProperty: {
                            GeocoderMetaData: {
                                text: 'name'
                            }
                        }
                    }
                },
                {
                    GeoObject: {
                        metaDataProperty: {
                            GeocoderMetaData: {
                                text: 'name'
                            }
                        }
                    }
                }
            ]
        }
    }
};

describe('Placemark actions', () => {
    describe('Sync actions', () => {
        beforeEach(function () {
            store.clearActions();
        });

        it('addPlacemark', () => {
            let expectedAction = {
                type: ADD_PLACEMARK,
                payload: {id: 1, name: 'name', coords: [1, 1]}
            };

            store.dispatch(addPlacemark(expectedAction.payload));

            expect(store.getActions()[0]).toEqual(expectedAction);
        });

        it('updatePlacemarks', () => {
            let expectedAction = {
                type: UPDATE_PLACEMARKS,
                payload: [{id: 1, name: 'name', coords: [1, 1]}, {id: 2, name: 'name', coords: [2, 2]}]
            };

            store.dispatch(updatePlacemarks(expectedAction.payload));

            expect(store.getActions()[0]).toEqual(expectedAction);
        });

        it('removePlacemark', () => {
            let expectedAction = {
                type: REMOVE_PLACEMARK,
                payload: 1
            };

            store.dispatch(removePlacemark(expectedAction.payload));

            expect(store.getActions()[0]).toEqual(expectedAction);

            store.clearActions()
        });
    });

    describe('Async actions', () => {
        beforeEach(function () {
            store.clearActions();
        });

        it('getPlacemarkData success', () => {
            const coords = [1, 1];
            const id = 1;

            let expectedAction = [
                {
                    type: GET_PLACEMARK_REQUEST
                },
                {
                    type: GET_PLACEMARK_SUCCESS,
                    payload: {id: id, name: 'name', coords: coords}
                }
            ];

            mock.onGet(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${config.apiKey}&geocode=${coords.toString()}`).reply(200, data);
            return store.dispatch(getPlacemarkData(coords, id))
                .then(() => {
                    expect(store.getActions()[0]).toEqual((expectedAction[0]));
                    expect(store.getActions()[1]).toEqual((expectedAction[1]));

                })
        });

        it('getPlacemarkData error', () => {
            const coords = [1, 1];
            const id = 1;

            let expectedAction = [
                {
                    type: GET_PLACEMARK_REQUEST
                },
                {
                    type: GET_PLACEMARK_ERROR,
                    payload: 'Произошла ошибка при загрузке данных метки, повторите позже.'
                }
            ];

            mock.onGet(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${config.apiKey}&geocode=${coords.toString()}`).reply(200, null);
            return store.dispatch(getPlacemarkData(coords, id))
                .then(() => {
                    expect(store.getActions()[0]).toEqual((expectedAction[0]));
                    expect(store.getActions()[1]).toEqual((expectedAction[1]));

                })
        });
    });
});
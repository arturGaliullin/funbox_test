import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
    SEARCH_DATA_REQUEST,
    SEARCH_DATA_SUCCESS,
    SEARCH_DATA_ERROR,
    DELETE_DATA
} from '../constants';
import { searchData, clearData } from './search';
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
                        },
                        Point: {
                            pos: '1 1'
                        }
                    }
                },
                {
                    GeoObject: {
                        metaDataProperty: {
                            GeocoderMetaData: {
                                text: 'name'
                            }
                        },
                        Point: {
                            pos: '2 2'
                        }
                    }
                }
            ]
        }
    }
};

describe('Search actions', () => {
    describe('Sync actions', () => {
        beforeEach(function () {
            store.clearActions();
        });

        it('clearData', () => {
            let expectedAction = {
                type: DELETE_DATA
            };

            store.dispatch(clearData());

            expect(store.getActions()[0]).toEqual(expectedAction);
        });
    });

    describe('Async actions', () => {
        beforeEach(function () {
            store.clearActions();
        });

        it('searchData success', () => {
            const place = 'Moscow';

            let expectedAction = [
                {
                    type: SEARCH_DATA_REQUEST
                },
                {
                    type: SEARCH_DATA_SUCCESS,
                    payload: [{id: 1, name: 'name', coords: ['1', '1']}, {id: 2, name: 'name', coords: ['2', '2']}]
                }
            ];

            mock.onGet(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${config.apiKey}&geocode=${place}`).reply(200, data);
            return store.dispatch(searchData(place))
                .then(() => {
                    expect(store.getActions()[0]).toEqual((expectedAction[0]));
                    expect(store.getActions()[1]).toEqual((expectedAction[1]));

                })
        });

        it('searchData error', () => {
            const place = 'Moscow';

            let expectedAction = [
                {
                    type: SEARCH_DATA_REQUEST
                },
                {
                    type: SEARCH_DATA_ERROR,
                    payload: 'Произошла ошибка при поиске, повторите позже.'
                }
            ];

            mock.onGet(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${config.apiKey}&geocode=${place}`).reply(200, null);
            return store.dispatch(searchData(place))
                .then(() => {
                    expect(store.getActions()[0]).toEqual((expectedAction[0]));
                    expect(store.getActions()[1]).toEqual((expectedAction[1]));

                })
        });
    });
});
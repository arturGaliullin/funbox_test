import axios from 'axios';
import uuidv4 from 'uuid/v4';
import { config } from '../config';
import {
    SEARCH_DATA_REQUEST,
    SEARCH_DATA_SUCCESS,
    SEARCH_DATA_ERROR,
    DELETE_DATA
} from '../constants';

export function searchData(string) {
    return dispatch => {
        dispatch({type: SEARCH_DATA_REQUEST});
        return axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${config.apiKey}&geocode=${string}`)
            .then(res => {
                const resultArray = res.data.response.GeoObjectCollection.featureMember.map(item => {
                   return {
                       id: uuidv4(),
                       name: item.GeoObject.metaDataProperty.GeocoderMetaData.text,
                       coords: item.GeoObject.Point.pos.split(' ').reverse()
                   }
                });
                dispatch({
                    type: SEARCH_DATA_SUCCESS,
                    payload: resultArray
                });
            })
            .catch(err => {
                dispatch({
                    type: SEARCH_DATA_ERROR,
                    payload: 'Произошла ошибка при поиске, повторите позже.'
                });
            })
    }

}

export function clearData() {
    return dispatch => {
        dispatch({type: DELETE_DATA});
    }

}
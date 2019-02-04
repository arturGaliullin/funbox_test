import {
    ADD_PLACEMARK,
    REMOVE_PLACEMARK,
    GET_PLACEMARK_REQUEST,
    GET_PLACEMARK_SUCCESS,
    GET_PLACEMARK_ERROR,
    UPDATE_PLACEMARKS
} from '../constants';
import axios from 'axios';
import { config } from '../config';

export function updatePlacemarks(placemarks) {
    return dispatch => {
        dispatch({
            type: UPDATE_PLACEMARKS,
            payload: placemarks
        })
    }
}

export function addPlacemark(placemark) {
    return dispatch => {
        dispatch({
            type: ADD_PLACEMARK,
            payload: placemark
        })
    }
}

export function removePlacemark(id) {
    return dispatch => {
        dispatch({
            type: REMOVE_PLACEMARK,
            payload: id
        })
    }
}

export function getPlacemarkData(coords, id) {
    return dispatch => {
        dispatch({type: GET_PLACEMARK_REQUEST});
        return axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${config.apiKey}&geocode=${coords.toString()}`)
            .then(res => {
                const resultArray = res.data.response.GeoObjectCollection.featureMember.map(item => {
                    return {
                        id: id,
                        name: item.GeoObject.metaDataProperty.GeocoderMetaData.text,
                        coords: coords
                    }
                });
                dispatch({
                    type: GET_PLACEMARK_SUCCESS,
                    payload: resultArray[0]
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_PLACEMARK_ERROR,
                    payload: 'Произошла ошибка при загрузке данных метки, повторите позже.'
                });
            })
    }
}
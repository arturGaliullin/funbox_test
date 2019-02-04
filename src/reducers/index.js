import { combineReducers } from 'redux';
import search from './search';
import placemark from './placemark';

export default combineReducers({
    search,
    placemark
})
import { combineReducers } from 'redux';
import { UPDATE_GEOHASH } from '../actions/location';

const location  = (location = { geohash: ''}, action) => {
    switch (action.type) {
        case UPDATE_GEOHASH:
            return { geohash: action.geohash }
        default:
            return location;
    }
}

export default combineReducers({ location });
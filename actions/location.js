export const UPDATE_GEOHASH = 'UPDATE_GEOHASH';

export const updateLocation = (geohash) => ({ type: UPDATE_GEOHASH, geohash });

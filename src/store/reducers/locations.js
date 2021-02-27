import {
  SET_LOCATIONS,
  ADD_TO_BOOKMARKED,
  ADD_LOCATION,
  UPDATE_LOCATIONS,
  SET_NEARBY_LOCATIONS,
} from '../actions/locations';
import {getDistance} from 'geolib';

const initialState = {
  locations: [],
  bookmarkedLocations: [],
  nearbyLocations: [],
};

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return {
        ...state,
        locations: Object.values(action.locations),
      };
    case ADD_TO_BOOKMARKED:
      return {
        ...state,
        bookmarkedLocations: [action.location, ...state.bookmarkedLocations],
      };
    case ADD_LOCATION:
      return {
        ...state,
        locations: [action.location, ...state.locations],
      };
    case UPDATE_LOCATIONS:
      state.locations.find(
        (location) => location.name === action.curLocation,
      ).parkingAreas = action.locations.parkingAreas;

      return {
        ...state,
        locations: state.locations,
      };
    case SET_NEARBY_LOCATIONS:
      let nearby = [];

      state.locations.forEach((loc) => {
        let distance = getDistance(action.position.coords, {
          latitude: loc.coordinates.lat,
          longitude: loc.coordinates.lng,
        });
        if (distance < 2000) {
          nearby.push(loc);
        }
      });

      return {
        ...state,
        nearbyLocations: nearby,
      };

    default:
      return state;
  }
};

export default locationsReducer;

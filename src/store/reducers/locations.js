import {
  SET_LOCATIONS,
  ADD_TO_BOOKMARKED,
  ADD_LOCATION,
  UPDATE_LOCATIONS,
  SET_NEARBY_LOCATIONS,
  SET_CURRENT_MARKER,
} from '../actions/locations';
import {getDistance} from 'geolib';
import MapItems from '../../constants/Map';

const initialState = {
  locations: [],
  bookmarkedLocations: [],
  nearbyLocations: [],
  userLocation: null,
  selectedLocation: null,
};

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATIONS: {
      return {
        ...state,
        locations: Object.values(action.locations),
      };
    }
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
        let distance = getDistance(action.position, {
          latitude: loc.coordinates.lat,
          longitude: loc.coordinates.lng,
        });
        if (distance < MapItems.circleRadius) {
          nearby.push(loc);
        }
      });

      return {
        ...state,
        nearbyLocations: nearby,
        userLocation: {
          latitude: action.position.latitude,
          longitude: action.position.longitude,
        },
      };
    case SET_CURRENT_MARKER:
      return {
        ...state,
        selectedLocation: action.location,
      };
    default:
      return state;
  }
};

export default locationsReducer;

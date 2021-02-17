import {
  SET_LOCATIONS,
  ADD_TO_BOOKMARKED,
  ADD_LOCATION,
} from '../actions/locations';

const initialState = {
  locations: [],
  bookmarkedLocations: [],
};

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return {
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
    default:
      return state;
  }
};

export default locationsReducer;

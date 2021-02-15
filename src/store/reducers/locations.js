import {SET_LOCATIONS, ADD_TO_BOOKMARKED} from '../actions/locations';

const initialState = {
  locations: [],
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

    default:
      return state;
  }
};

export default locationsReducer;

import {SET_LOCATIONS} from '../actions/locations';

const initialState = {
  locations: [],
};

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return {
        locations: Object.values(action.locations),
      };
    default:
      return state;
  }
};

export default locationsReducer;

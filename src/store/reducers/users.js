import {
  ERROR,
  SET_DID_TRY_AL,
  AUTHENTICATE,
  LOGOUT,
  LOCAL_SIGNIN,
} from '../actions/users';
import {
  SET_BOOKMARKED_LOCATIONS,
  REMOVE_FROM_BOOKMARKED,
  RESERVE_PLACE,
  CANCEL,
  DID_RESERVE,
} from '../actions/locations';

const initialState = {
  user: null,
  token: null,
  error: null,
  didTryAL: false,
  didReserve: false,
  reservedPlace: null,
  reservedArea: null,
  reservationDate: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DID_TRY_AL:
      return {
        didTryAL: true,
      };
    case AUTHENTICATE: {
      return {
        token: action.token,
        didTryAL: true,
        user: {
          ...action.user,
          uid: action.token,
          bookmarkedLocations: action.user.bookmarkedLocations
            ? action.user.bookmarkedLocations
            : {},
        },
      };
    }
    case LOCAL_SIGNIN: {
      return {
        token: action.user.uid,
        user: action.user,
      };
    }
    case ERROR: {
      return {
        error: action.error,
      };
    }
    case RESERVE_PLACE: {
      return {
        ...state,
        didReserve: true,
        reservedPlace: action.place,
        reservedArea: action.area,
        reservationDate: action.date,
      };
    }
    case SET_BOOKMARKED_LOCATIONS: {
      let updatedBookmarkedLocations = Object.values(
        state.user.bookmarkedLocations,
      );

      updatedBookmarkedLocations.push(action.location);

      return {
        ...state,
        user: {
          ...state.user,
          bookmarkedLocations: Object.assign({}, updatedBookmarkedLocations),
        },
      };
    }
    case REMOVE_FROM_BOOKMARKED: {
      const bookmarked = Object.values(state.user.bookmarkedLocations).filter(
        (location) => location.name !== action.locationName,
      );

      return {
        ...state,
        user: {
          ...state.user,
          bookmarkedLocations: Object.assign({}, bookmarked),
        },
      };
    }
    case LOGOUT:
      return {
        user: null,
        token: null,
      };
    case CANCEL: {
      return {
        ...state,
        didReserve: false,
      };
    }
    case DID_RESERVE: {
      const location = action.locations.find(
        (loc) => loc.name === action.reservation.place,
      );

      return {
        ...state,
        didReserve: true,
        reservationDate: action.reservation.time,
        reservedPlace: location,
        reservedArea: Object.values(location.parkingAreas).find(
          (area) => area.name === action.reservation.area,
        ),
      };
    }
    default:
      return state;
  }
};

export default usersReducer;

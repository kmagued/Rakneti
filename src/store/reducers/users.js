import {
  ERROR,
  SET_DID_TRY_AL,
  AUTHENTICATE,
  LOGOUT,
  LOCAL_SIGNIN,
  OPEN_CAR_SCREEN,
  CANCEL_CAR_CHOICE,
  ADD_CAR,
  CHANGE_CAR,
} from '../actions/users';
import {
  SET_BOOKMARKED_LOCATIONS,
  REMOVE_FROM_BOOKMARKED,
  RESERVE_PLACE,
  CANCEL,
  DID_RESERVE,
  DID_ARRIVE,
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
  didArrive: false,
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
            : [],
          cars: Object.values(action.user.cars),
          history: action.user.history ? action.user.history : [],
        },
      };
    }
    case LOCAL_SIGNIN: {
      return {
        token: action.user.uid,
        user: {
          ...action.user,
          cars: Object.values(action.user.cars),
          bookmarkedLocations: action.user.bookmarkedLocations
            ? action.user.bookmarkedLocations
            : [],
          history: action.user.history ? action.user.history : [],
        },
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
    case DID_ARRIVE: {
      return {
        ...state,
        didReserve: false,
        didArrive: true,
      };
    }
    case OPEN_CAR_SCREEN: {
      return {
        ...state,
        car: true,
      };
    }
    case CANCEL_CAR_CHOICE: {
      return {
        ...state,
        car: false,
      };
    }
    case ADD_CAR: {
      return {
        ...state,
        user: {
          ...state.user,
          cars: [...state.user.cars, action.car],
        },
      };
    }
    case CHANGE_CAR: {
      const id = state.user.cars.findIndex(
        (car) => car.licensePlate === action.car.licensePlate,
      );

      const activeId = state.user.cars.findIndex((car) => car.active);

      state.user.cars[id].active = true;
      state.user.cars[activeId].active = false;

      return {
        ...state,
        user: {
          ...state.user,
          cars: state.user.cars,
        },
      };
    }
    default:
      return state;
  }
};

export default usersReducer;

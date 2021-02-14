import {
  ERROR,
  SET_DID_TRY_AL,
  AUTHENTICATE,
  RESERVE_PLACE,
} from '../actions/users';

const initialState = {
  user: null,
  token: null,
  error: null,
  didTryAL: false,
  didReserve: false,
  reservedPlace: null,
  reservedArea: null,
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
      };
    }
    default:
      return state;
  }
};

export default usersReducer;

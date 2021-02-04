import {ERROR, SET_DID_TRY_AL, AUTHENTICATE} from '../actions/users';

const initialState = {
  user: null,
  token: null,
  error: null,
  didTryAL: false,
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
      };
    }
    case ERROR: {
      return {
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export default usersReducer;

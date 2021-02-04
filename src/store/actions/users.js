export const AUTHENTICATE = 'AUTHENTICATE';
export const ERROR = 'ERROR';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const tryLocalSignin = () => async (dispatch) => {
  const data = await AsyncStorage.getItem('user');
  if (!data) {
    dispatch({
      type: SET_DID_TRY_AL,
    });
  }
  const token = JSON.parse(data);
  dispatch({
    type: AUTHENTICATE,
    token,
  });
};

export const authenticate = (email, password) => async (dispatch) => {
  if (email && password) {
    dispatch({
      type: AUTHENTICATE,
      token: email,
    });
    // AsyncStorage.setItem('user', email);
  } else {
    dispatch({
      type: ERROR,
      error: 'Invalid email or password',
    });
  }
};

export const AUTHENTICATE = 'AUTHENTICATE';
export const ERROR = 'ERROR';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const RESERVE_PLACE = 'RESERVE_PLACE';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';

export const tryLocalSignin = () => async (dispatch) => {
  const data = await AsyncStorage.getItem('user');
  if (!data) {
    dispatch({
      type: SET_DID_TRY_AL,
    });
  }
  const token = data;
  dispatch({
    type: AUTHENTICATE,
    token,
  });
};

export const login = (uid) => async (dispatch) => {
  firebase
    .database()
    .ref('/users')
    .child(uid)
    .once('value')
    .then((snapshot) => {
      dispatch({
        type: AUTHENTICATE,
        user: snapshot.val(),
        token: uid,
      });
    });

  // await AsyncStorage.setItem('user', token);
};

export const reserve = (place, area) => async (dispatch) => {
  dispatch({
    type: RESERVE_PLACE,
    place,
    area,
  });
};

export const signup = (uid, email, fullName, mobile, carDetails) => async (
  dispatch,
) => {
  firebase
    .database()
    .ref('users/' + uid)
    .set({
      fullName,
      email,
      mobile,
      carDetails,
    })
    .then(() => {
      dispatch({
        type: AUTHENTICATE,
        user: {email, fullName, mobile, carDetails},
        token: uid,
      });
    });
};

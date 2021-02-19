export const AUTHENTICATE = 'AUTHENTICATE';
export const ERROR = 'ERROR';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const LOGOUT = 'LOGOUT';
export const LOCAL_SIGNIN = 'LOCAL_SIGNIN';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';

export const tryLocalSignin = () => async (dispatch) => {
  const data = await AsyncStorage.getItem('user');
  if (!data) {
    dispatch({
      type: SET_DID_TRY_AL,
    });
  } else {
    const user = JSON.parse(data);
    dispatch({
      type: LOCAL_SIGNIN,
      user,
    });
  }
};

export const login = (uid) => async (dispatch) => {
  firebase
    .database()
    .ref('/users')
    .child(uid)
    .once('value')
    .then(async (snapshot) => {
      dispatch({
        type: AUTHENTICATE,
        user: snapshot.val(),
        token: uid,
      });

      await AsyncStorage.setItem(
        'user',
        JSON.stringify({...snapshot.val(), uid}),
      );
    });
};

export const signup = (uid, email, fullName, mobile, carDetails) => async (
  dispatch,
) => {
  let userInfo = {email, fullName, mobile, carDetails};
  firebase
    .database()
    .ref('users/' + uid)
    .set({
      fullName,
      email,
      mobile,
      carDetails,
    })
    .then(async () => {
      dispatch({
        type: AUTHENTICATE,
        user: userInfo,
        token: uid,
      });
      await AsyncStorage.setItem('user', JSON.stringify({...userInfo, uid}));
    });
};

export const logout = () => async (dispatch) => {
  AsyncStorage.removeItem('user');
  dispatch({
    type: LOGOUT,
  });
};

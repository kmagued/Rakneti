export const AUTHENTICATE = 'AUTHENTICATE';
export const ERROR = 'ERROR';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const LOGOUT = 'LOGOUT';
export const LOCAL_SIGNIN = 'LOCAL_SIGNIN';
export const SET_USER_LOCATION = 'SET_USER_LOCATION';
export const ADD_CAR = 'ADD_CAR';
export const CHANGE_CAR = 'CHANGE_CAR';

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
  let userInfo = {
    email,
    fullName,
    mobile,
    cars: {0: {...carDetails, active: true}},
    bookmarkedLocations: {},
  };
  firebase
    .database()
    .ref('users/' + uid)
    .set(userInfo)
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

export const addCar = (uid, details) => async (dispatch) => {
  const carDetails = {...details, active: false};

  let user = await AsyncStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
    let updatedCars = [...Object.values(user.cars), carDetails];
    user.cars = updatedCars;

    await AsyncStorage.setItem('user', JSON.stringify(user));
  }

  firebase
    .database()
    .ref(`users/${uid}/cars`)
    .push(carDetails)
    .then(() => {
      dispatch({type: ADD_CAR, car: carDetails});
    });
};

export const changeCar = (uid, chosenCar) => async (dispatch) => {
  let user = await AsyncStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);

    const cars = Object.values(user.cars);
    cars[cars.findIndex((car) => car.active)].active = false;
    cars[
      cars.findIndex((car) => car.licensePlate === chosenCar.licensePlate)
    ].active = true;

    await AsyncStorage.setItem('user', JSON.stringify(user));
  }

  firebase
    .database()
    .ref(`users/${uid}/cars`)
    .once('value')
    .then((snapshot) => {
      let cars = snapshot.val();
      const activeIndex = Object.values(cars).findIndex((car) => car.active);
      const activeCarId = Object.keys(cars)[activeIndex];

      const index = Object.values(cars).findIndex(
        (car) => car.licensePlate === chosenCar.licensePlate,
      );
      const carId = Object.keys(cars)[index];

      firebase
        .database()
        .ref(`users/${uid}/cars/${activeCarId}`)
        .update({...cars[activeIndex], active: false})
        .then(() => {
          firebase
            .database()
            .ref(`users/${uid}/cars/${carId}`)
            .update({...cars[index], active: true});
        })
        .then(() => {
          dispatch({type: CHANGE_CAR, car: chosenCar});
        });
    });
};

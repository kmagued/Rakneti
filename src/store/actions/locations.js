import firebase from 'firebase';
import moment from 'moment';

export const SET_LOCATIONS = 'SET_LOCATIONS';
export const ADD_TO_BOOKMARKED = 'ADD_TO_BOOKMARKED';
export const SET_BOOKMARKED_LOCATIONS = 'SET_BOOKMARKED_LOCATIONS';
export const REMOVE_FROM_BOOKMARKED = 'REMOVE_FROM_BOOKMARKED';
export const ADD_LOCATION = 'ADD_LOCATION';
export const UPDATE_LOCATIONS = 'UPDATE_LOCATIONS';
export const RESERVE_PLACE = 'RESERVE_PLACE';
export const CANCEL = 'CANCEL';
export const SET_NEARBY_LOCATIONS = 'SET_NEARBY_LOCATIONS';
export const SET_CURRENT_MARKER = 'SET_CURRENT_MARKER';
export const DID_RESERVE = 'DID_RESERVE';

import Geolocation from 'react-native-geolocation-service';
import {Platform} from 'react-native';
import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocations = () => async (dispatch) => {
  return firebase
    .database()
    .ref('/locations')
    .once('value')
    .then((snapshot) => {
      dispatch({type: SET_LOCATIONS, locations: snapshot.val()});
    })
    .catch((err) => console.log(err));
};

export const updateLocations = (location) => async (dispatch) => {
  return firebase
    .database()
    .ref('/locations')
    .on(
      'child_changed',
      (snapshot) => {
        dispatch({
          type: UPDATE_LOCATIONS,
          locations: snapshot.val(),
          curLocation: location,
        });
      },
      (err) => console.log(err),
    );
};

export const addToBookmarkedLocations = (uid, location) => async (dispatch) => {
  const bookmarkedLocation = {
    name: location.name,
    address: location.address,
    dateAdded: moment().format('MMM DD, YYYY'),
    coordinates: location.coordinates,
    image: location.image,
  };

  let user = await AsyncStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
    let updatedBookmarks = {...user.bookmarkedLocations, location};
    user.bookmarkedLocations = updatedBookmarks;

    await AsyncStorage.setItem('user', JSON.stringify(user));
  }

  firebase
    .database()
    .ref(`users/${uid}/bookmarkedLocations/${location.name}`)
    .set(bookmarkedLocation)
    .then(() => {
      dispatch({
        type: SET_BOOKMARKED_LOCATIONS,
        location: bookmarkedLocation,
      });
    });
};

export const removeFromBookmarkedLocations = (uid, location) => async (
  dispatch,
) => {
  let user = await AsyncStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
    let updatedBookmarks = Object.values(user.bookmarkedLocations).filter(
      (item) => item.name !== location.name,
    );
    user.bookmarkedLocations = updatedBookmarks;

    await AsyncStorage.setItem('user', JSON.stringify(user));
  }

  firebase
    .database()
    .ref(`users/${uid}/bookmarkedLocations/${location.name}`)
    .remove()
    .then(() => {
      dispatch({
        type: REMOVE_FROM_BOOKMARKED,
        locationName: location.name,
      });
    });
};

export const addLocation = (name, address, image, coords, areas) => async (
  dispatch,
) => {
  const newLocation = {
    name,
    address,
    image,
    coordinates: coords,
    parkingAreas: areas,
  };

  return firebase
    .database()
    .ref('/locations')
    .push(newLocation)
    .then(() => {
      dispatch({
        type: ADD_LOCATION,
        location: newLocation,
      });
    });
};

export const reserveLocation = (place, area, index, uid) => async (
  dispatch,
) => {
  firebase
    .database()
    .ref('locations')
    .orderByChild('name')
    .equalTo(place.name)
    .once('value')
    .then((snapshot) => {
      let value = snapshot.val();
      if (value) {
        let key = Object.keys(value)[0];
        firebase
          .database()
          .ref(`locations/${key}/parkingAreas/${index}`)
          .update({
            ...area,
            availableSpots:
              Object.values(value)[0].parkingAreas[index].availableSpots - 1,
          })
          .then(() => {
            firebase.database().ref(`reservations/${uid}`).set({
              place: place.name,
              area: area.name,
              time: Date().toString(),
              arrived: false,
            });
          });
      }
    });

  dispatch({
    type: RESERVE_PLACE,
    place,
    area,
    date: Date.now(),
  });
};

export const cancelReservation = (place, area, index, uid) => async (
  dispatch,
) => {
  return firebase
    .database()
    .ref('locations')
    .orderByChild('name')
    .equalTo(place.name)
    .once('value')
    .then((snapshot) => {
      let value = snapshot.val();
      if (value) {
        let key = Object.keys(value)[0];
        firebase
          .database()
          .ref(`locations/${key}/parkingAreas/${index}`)
          .update({
            ...area,
            availableSpots:
              Object.values(value)[0].parkingAreas[index].availableSpots + 1,
          })
          .then(() => {
            firebase
              .database()
              .ref(`reservations/${uid}`)
              .remove()
              .then(() => {
                dispatch({
                  type: CANCEL,
                });
              });
          });
      }
    });
};

export const getUserLocation = () => async (dispatch) => {
  const res =
    Platform.OS === 'ios'
      ? await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      : await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

  if (res === RESULTS.GRANTED) {
    Geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: SET_NEARBY_LOCATIONS,
          position: position.coords,
        });
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  } else if (res === RESULTS.DENIED) {
    const res2 =
      Platform.OS === 'ios'
        ? await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        : await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    res2 === RESULTS.GRANTED
      ? Geolocation.getCurrentPosition(
          (position) => {
            dispatch({
              type: SET_NEARBY_LOCATIONS,
              position: position.coords,
            });
          },
          (error) => {
            console.log(error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        )
      : null;
  }
};

export const setUserLocation = (position) => async (dispatch) => {
  dispatch({
    type: SET_NEARBY_LOCATIONS,
    position,
  });
};

export const selectMarker = (location) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_MARKER,
    location,
  });
};

export const didReserveSpot = (uid, locations) => async (dispatch) => {
  firebase
    .database()
    .ref(`reservations/${uid}`)
    .get()
    .then((snapshot) => {
      if (snapshot.val()) {
        dispatch({
          type: DID_RESERVE,
          reservation: snapshot.val(),
          locations,
        });
      }
    });
};

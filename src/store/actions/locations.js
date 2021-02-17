import firebase from 'firebase';
import moment from 'moment';

export const SET_LOCATIONS = 'SET_LOCATIONS';
export const ADD_TO_BOOKMARKED = 'ADD_TO_BOOKMARKED';
export const SET_BOOKMARKED_LOCATIONS = 'SET_BOOKMARKED_LOCATIONS';
export const REMOVE_FROM_BOOKMARKED = 'REMOVE_FROM_BOOKMARKED';
export const ADD_LOCATION = 'ADD_LOCATION';

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

export const addToBookmarkedLocations = (uid, location) => async (dispatch) => {
  const bookmarkedLocation = {
    name: location.name,
    address: location.address,
    dateAdded: moment().format('MMM DD, YYYY'),
    coordinates: location.coordinates,
    image: location.image,
  };

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

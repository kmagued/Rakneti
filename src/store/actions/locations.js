import firebase from 'firebase';

export const SET_LOCATIONS = 'SET_LOCATIONS';

export const getLocations = () => async (dispatch) => {
  firebase
    .database()
    .ref('/locations')
    .once('value')
    .then((snapshot) => {
      dispatch({type: SET_LOCATIONS, locations: snapshot.val()});
    })
    .catch((err) => console.log(err));
};

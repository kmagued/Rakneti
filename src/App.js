import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, Platform, View, Text} from 'react-native';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';

import usersReducer from './store/reducers/users';
import locationsReducer from './store/reducers/locations';

import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import AppNavigator from './navigation/AppNavigator';
import firebase from 'firebase';
import env from '../env';

// const enhancers = [
//   applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// ];

const store = createStore(
  combineReducers({
    users: usersReducer,
    locations: locationsReducer,
  }),
  applyMiddleware(thunk),
);

var firebaseConfig = {
  apiKey: env.firebaseApiKey,
  authDomain: 'rakneti.firebaseapp.com',
  databaseURL: 'https://rakneti-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'rakneti',
  storageBucket: 'rakneti.appspot.com',
  messagingSenderId: '707577468734',
  appId: '1:707577468734:web:bc5a36279c6d1b2fbafe6f',
  measurementId: 'G-9JJP8VHM6G',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      />
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </>
  );
}

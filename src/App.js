import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, Platform} from 'react-native';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import usersReducer from './store/reducers/users';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import AppNavigator from './navigation/AppNavigator';

// const enhancers = [
//   applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// ];

const store = createStore(
  combineReducers({
    users: usersReducer,
  }),
  applyMiddleware(thunk),
);

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

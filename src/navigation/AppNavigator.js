import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import {AuthNavigator, Drawer} from '../navigation/MainNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import ReservationDetails from '../screens/ReservationDetails';

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => state.users.token);
  const didReserve = useSelector((state) => state.users.didReserve);
  const didTryAutoLogin = useSelector((state) => state.users.didTryAL);

  return (
    <NavigationContainer>
      {isAuth && !didReserve && <Drawer />}
      {isAuth && didReserve && <ReservationDetails />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <LoadingScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;

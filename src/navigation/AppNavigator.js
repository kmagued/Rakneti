import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import {AuthNavigator, TabNavigator} from '../navigation/MainNavigator';
import LoadingScreen from '../screens/LoadingScreen';

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => state.users.token);
  const didTryAutoLogin = useSelector((state) => state.users.didTryAL);

  return (
    <NavigationContainer>
      {isAuth && <TabNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <LoadingScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;

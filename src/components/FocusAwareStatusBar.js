import React from 'react';
import {StatusBar, Platform} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused && Platform.OS === 'ios' ? <StatusBar {...props} /> : null;
}

export default FocusAwareStatusBar;

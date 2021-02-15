import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const Header = (props) => {
  return (
    <View style={{...styles.container, ...props.style}}>
      <View style={{marginLeft: 10}}>{props.leftComponent}</View>
      <View
        style={{
          marginRight: props.rightComponent ? -20 : 0,
          marginLeft: props.leftComponent ? -20 : 0,
        }}>
        {props.centerComponent}
      </View>
      <View style={{marginRight: 10}}>{props.rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    zIndex: 1,
  },
});

export default Header;

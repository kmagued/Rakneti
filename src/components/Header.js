import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const Header = (props) => {
  return (
    <View style={styles.container}>
      <View style={{marginLeft: 5}}>{props.leftComponent}</View>
      <View
        style={{
          marginRight: props.rightComponent ? -5 : 0,
          marginLeft: props.leftComponent ? -30 : 0,
        }}>
        {props.centerComponent}
      </View>
      <View style={{marginRight: 5}}>{props.rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryColor,
    padding: 10,
    zIndex: 1,
  },
});

export default Header;

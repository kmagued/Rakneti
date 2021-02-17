import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import TextComp from './TextComp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const ReservationContainer = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}
      style={{
        backgroundColor: Colors.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}>
      <TextComp
        bold
        style={{color: 'white', paddingVertical: 20, fontSize: 16}}>
        Reservation Details
      </TextComp>
      <View>
        <Ionicons name="ios-arrow-forward" size={25} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default ReservationContainer;

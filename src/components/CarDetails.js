import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextComp from './TextComp';
import Colors from '../constants/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CarDetails = (props) => (
  <View style={{...styles.container, ...styles.row}}>
    <View>
      <FontAwesome5 name="car-alt" size={60} color="#ccc" />
      <View
        style={{
          ...styles.carColor,
          backgroundColor: props.car.color.toLowerCase(),
        }}
      />
    </View>
    <View style={{marginLeft: 20}}>
      <TextComp
        black={props.current}
        style={{fontSize: 18, color: Colors.secondary}}>
        {props.car.make} {props.car.model}
      </TextComp>
      <TextComp style={{fontSize: 20, color: 'dimgrey', textAlign: 'left'}}>
        {props.car.licensePlate}
      </TextComp>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  carColor: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    position: 'absolute',
    marginLeft: 30,
    marginTop: 25,
  },
});

export default CarDetails;

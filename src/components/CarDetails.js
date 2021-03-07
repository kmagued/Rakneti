import React from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import TextComp from './TextComp';
import Colors from '../constants/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CarDetails = (props) => (
  <TouchableHighlight
    underlayColor="rgba(248,248,248, 0.5)"
    style={{...styles.container, ...styles.row}}
    onPress={props.onChoose}>
    <>
      <View style={styles.row}>
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
          <TextComp bold style={{fontSize: 18, color: Colors.secondary}}>
            {props.car.make} {props.car.model}
          </TextComp>
          <TextComp style={{fontSize: 20, color: 'dimgrey', textAlign: 'left'}}>
            {props.car.licensePlate}
          </TextComp>
        </View>
      </View>
      {props.current && (
        <View>
          <FontAwesome5 name="check" size={20} color={Colors.primaryColor} />
        </View>
      )}
    </>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
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

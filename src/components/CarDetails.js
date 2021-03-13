import React from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import TextComp from './TextComp';
import Colors from '../constants/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

const CarDetails = (props) => (
  <TouchableHighlight
    underlayColor={props.profile ? null : 'rgba(248,248,248, 0.7)'}
    style={{...styles.container, ...styles.row}}
    onPress={props.onChoose}>
    <>
      <View style={styles.row}>
        <View>
          <FontAwesome5 name="car-alt" size={50} color="#ccc" />
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
      {props.profile && (
        <View>
          <Entypo name="chevron-small-right" size={25} color="#b6b6b6" />
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
    borderRadius: 10,
  },
  carColor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    marginLeft: 25,
    marginTop: 20,
  },
});

export default CarDetails;

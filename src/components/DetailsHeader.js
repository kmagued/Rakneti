import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextComp from './TextComp';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../constants/Colors';
import Header from './Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DetailsHeader = (props) => {
  return (
    <>
      <Header
        style={{backgroundColor: Colors.primaryColor}}
        centerComponent={
          <TextComp bold style={{fontSize: 18, color: 'white'}}>
            RESERVATION DETAILS
          </TextComp>
        }
        leftComponent={
          <Ionicons name="ios-arrow-back" size={30} color="white" />
        }
      />
      <View
        style={{
          alignItems: 'center',
          backgroundColor: Colors.primaryColor,
          marginBottom: 30,
          paddingBottom: 30,
        }}>
        <View style={styles.checkContainer}>
          <Entypo name="check" size={40} color="white" />
        </View>
        <TextComp
          black
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'white',
            marginBottom: 5,
          }}>
          You reserved successfully
        </TextComp>

        <TextComp style={{color: 'rgba(255,255,255,0.9)', fontSize: 16}}>
          You will receive a confirmation on your email
        </TextComp>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  checkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: 'white',
    width: 90,
    height: 90,
    borderRadius: 45,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default DetailsHeader;
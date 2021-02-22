import React from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import TextComp from './TextComp';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../constants/Colors';
import Header from './Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailsHeader = (props) => {
  return (
    <>
      <Header
        style={{backgroundColor: Colors.primaryColor}}
        centerComponent={
          <TextComp bold style={{fontSize: 18, color: 'white'}}>
            Reservation Details
          </TextComp>
        }
        leftComponent={
          <TouchableOpacity onPress={props.onBack}>
            <Ionicons name="ios-arrow-back" size={30} color="white" />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity onPress={props.onOpenQR}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={25}
              color="white"
            />
          </TouchableOpacity>
        }
      />
      <View
        style={{
          alignItems: 'center',
          backgroundColor: Colors.primaryColor,
          marginBottom: 30,
          paddingBottom: 30,
          borderBottomLeftRadius: Platform.OS === 'ios' ? 10 : 0,
          borderBottomRightRadius: Platform.OS === 'ios' ? 10 : 0,
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

import React from 'react';
import {
  TextInput,
  ImageBackground,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import TextComp from './TextComp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const FeaturedLocation = (props) => {
  return (
    <View style={{height: 400}}>
      <ImageBackground
        style={{height: '100%', width: '100%'}}
        source={{
          uri: props.location.image,
        }}>
        <SafeAreaView
          style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'space-between',
          }}>
          <View style={{height: '5%'}} />
          <View
            style={{
              height: '15%',
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={styles.inputContainer}>
              <Ionicons name="ios-search" color="grey" size={20} />
              <TextInput
                placeholder="Parking name, area..."
                style={styles.input}
                onFocus={props.onSearch}
              />
            </View>
            <TouchableOpacity onPress={props.onOpenMap} activeOpacity={0.6}>
              <Ionicons
                name="ios-location"
                size={30}
                color="rgba(255, 255, 255, 0.7)"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <TextComp bold style={{...styles.text, ...styles.featuredText}}>
              Featured
            </TextComp>
            <TextComp black style={styles.title}>
              {props.location.name}
            </TextComp>
            <View style={{flexDirection: 'row', width: '90%'}}>
              <Ionicons name="ios-location-sharp" color="white" size={20} />
              <TextComp style={{...styles.text, ...styles.addressText}}>
                {props.location.address}
              </TextComp>
            </View>
          </View>
          <View style={{height: '5%'}} />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
  },
  input: {
    fontFamily: 'Ubuntu-Regular',
    width: '90%',
    marginLeft: 10,
    paddingVertical: 13,
  },
  featuredText: {
    paddingLeft: 2,
    marginBottom: 7,
  },
  titleContainer: {
    paddingHorizontal: 30,
    height: '75%',
    justifyContent: 'flex-end',
  },
  title: {
    color: 'white',
    fontSize: 33,
    marginBottom: 10,
  },
  text: {color: 'white', fontSize: 16},
  addressText: {
    marginLeft: 5,
  },
});

export default FeaturedLocation;

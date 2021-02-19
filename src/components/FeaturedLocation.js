import React from 'react';
import {
  TextInput,
  ImageBackground,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import TextComp from './TextComp';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FeaturedLocation = (props) => (
  <View style={{height: 400}}>
    <ImageBackground
      style={{height: '100%', width: '100%'}}
      source={{
        uri: props.location.image,
      }}>
      <SafeAreaView style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
        <View style={{height: '5%'}} />
        <View style={{height: '50%', paddingHorizontal: 30}}>
          <View style={styles.inputContainer}>
            <Ionicons name="ios-search" color="grey" size={20} />
            <TextInput
              placeholder="Parking name, area..."
              style={styles.input}
              onFocus={props.onSearch}
            />
          </View>
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
      </SafeAreaView>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
    height: '45%',
    justifyContent: 'center',
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

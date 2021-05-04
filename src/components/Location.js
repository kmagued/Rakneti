import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import TextComp from './TextComp';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Location = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{...styles.placeContainer, ...props.style}}
    activeOpacity={0.9}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{
          uri: props.place.image,
        }}
      />
    </View>
    <View
      style={{
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 55,
      }}>
      <View style={{width: '90%'}}>
        <TextComp bold style={{fontSize: 18, marginBottom: 2}}>
          {props.place.name}
        </TextComp>
        <TextComp style={styles.addressText}>{props.place.address}</TextComp>
      </View>
      {props.favorites && (
        <TouchableOpacity onPress={props.onRemove}>
          <MaterialIcons
            name="delete-outline"
            size={25}
            color={Colors.secondary}
          />
        </TouchableOpacity>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  placeContainer: {
    width: SCREEN_WIDTH / 1.1,
    alignSelf: 'center',
    backgroundColor: 'whitesmoke',
    borderRadius: 20,
    marginHorizontal: 8,
    marginVertical: 5,
    paddingBottom: 15,
  },
  imageContainer: {
    height: SCREEN_WIDTH / 2.5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addressText: {
    color: 'grey',
    fontSize: 11,
  },
});

export default Location;

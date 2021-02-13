import React from 'react';
import {SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native';
import TextComp from '../components/TextComp';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import LicensePlateInput from '../components/LicensePlateInput';

class CarDetailsScreen extends React.Component {
  state = {
    make: null,
    model: null,
    color: null,
    plateNumber: '',
  };

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={{width: '7%', marginLeft: 20}}
            onPress={() => {
              this.props.navigation.navigate('Signup');
            }}>
            <Ionicons name="arrow-back" size={25} />
          </TouchableOpacity>
        </View>
        {/* Body */}
        <View style={styles.body}>
          <TextComp bold style={{fontSize: 24, alignSelf: 'center'}}>
            CAR DETAILS
          </TextComp>
          <View style={{marginVertical: 30}}>
            {/* Inputs */}
            <View>
              <Input
                icon={<Ionicons name="md-car" size={18} />}
                placeholder="Make"
                value={this.state.make}
                onChangeText={(make) => {
                  this.setState({make});
                }}
              />
              <Input
                icon={<MaterialCommunityIcons name="car-door" size={18} />}
                placeholder="Model"
                value={this.state.model}
                onChangeText={(model) => {
                  this.setState({model});
                }}
              />
              <Input
                icon={<Ionicons name="ios-color-palette" size={18} />}
                placeholder="Color"
                value={this.state.color}
                onChangeText={(color) => {
                  this.setState({color});
                }}
              />
              <Input
                style={{textAlign: 'left'}}
                autoCorrect={false}
                icon={<AntDesign name="wallet" size={18} />}
                placeholder="License plate (eg. سجط ٢٥٩٤)"
                value={this.state.plateNumber}
                onChangeText={(plateNumber) => {
                  this.setState({plateNumber});
                }}
              />
              <LicensePlateInput plateNumber={this.state.plateNumber} />
            </View>
          </View>
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.btnContainer}>
            <TextComp bold style={styles.btn}>
              Sign Up
            </TextComp>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('CarDetails');
              }}>
              <Ionicons
                name="arrow-forward-circle"
                color={Colors.primaryColor}
                size={50}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 0.15,
    justifyContent: 'center',
  },
  btnContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  btn: {
    fontSize: 24,
    marginRight: 10,
  },
  body: {
    flex: 0.65,
    justifyContent: 'center',
  },
  footer: {
    flex: 0.15,
  },
});

export default CarDetailsScreen;

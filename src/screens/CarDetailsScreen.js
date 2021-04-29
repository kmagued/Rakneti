import React from 'react';
import {SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native';
import TextComp from '../components/TextComp';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import LicensePlateInput from '../components/LicensePlateInput';
import {connect} from 'react-redux';
import {checkCarDetails, signup} from '../store/actions/users';
import auth from '@react-native-firebase/auth';

class CarDetailsScreen extends React.Component {
  state = {
    make: null,
    model: null,
    color: null,
    plateNumber: '',
    errors: {make: null, model: null, color: null, licensePlate: null},
  };

  signupHandler = (uid, email, fullName, mobile) => {
    const carDetails = {
      make: this.state.make,
      model: this.state.model,
      color: this.state.color,
      licensePlate: this.state.plateNumber,
    };

    this.props.signup(uid, email, fullName, mobile, carDetails).then(() => {
      auth().currentUser.sendEmailVerification();

      if (this.props.errors) {
        this.setState({errors: this.props.errors});
      }
    });
  };

  render() {
    const {uid, email, fullName, mobile} = this.props.route.params;

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
                error={this.state.errors.make}
                value={this.state.make}
                onChangeText={(make) => {
                  this.setState({
                    make,
                    errors: {...this.state.errors, make: null},
                  });
                }}
              />
              <Input
                icon={<MaterialCommunityIcons name="car-door" size={18} />}
                placeholder="Model"
                value={this.state.model}
                error={this.state.errors.model}
                onChangeText={(model) => {
                  this.setState({
                    model,
                    errors: {...this.state.errors, model: null},
                  });
                }}
              />
              <Input
                icon={<Ionicons name="ios-color-palette" size={18} />}
                placeholder="Color"
                value={this.state.color}
                error={this.state.errors.color}
                onChangeText={(color) => {
                  this.setState({
                    color,
                    errors: {...this.state.errors, color: null},
                  });
                }}
              />
              <Input
                style={{textAlign: 'left'}}
                autoCorrect={false}
                icon={<AntDesign name="wallet" size={18} />}
                placeholder="License plate (eg. سجط ٢٥٩٤)"
                value={this.state.plateNumber}
                error={this.state.errors.licensePlate}
                onChangeText={(plateNumber) => {
                  this.setState({
                    plateNumber,
                    errors: {...this.state.errors, licensePlate: null},
                  });
                }}
              />
              <LicensePlateInput plateNumber={this.state.plateNumber} />
              <View style={{alignItems: 'center', marginTop: 40}}>
                <TextComp bold style={{color: Colors.error, fontSize: 16}}>
                  {this.state.error}
                </TextComp>
              </View>
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
              onPress={() => this.signupHandler(uid, email, fullName, mobile)}>
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

const mapStateToProps = (state) => ({
  errors: state.users.carErrors,
});

const mapDispatchToProps = {
  signup,
  check: checkCarDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarDetailsScreen);

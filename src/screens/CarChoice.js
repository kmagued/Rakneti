import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import TextComp from '../components/TextComp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import CarDetails from '../components/CarDetails';
import Colors from '../constants/Colors';
import {addCar, changeCar} from '../store/actions/users';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const CarInput = (props) => {
  const [borderWidth, setborderWidth] = useState(1);
  const [borderColor, setBorderColor] = useState('grey');

  return (
    <>
      <TextComp style={styles.label}>{props.label}</TextComp>
      <TextInput
        {...props}
        autoFocus={props.auto}
        value={props.value}
        placeholderTextColor="#e6e6e6"
        autoCorrect={false}
        onFocus={() => {
          setborderWidth(3);
          setBorderColor(Colors.primaryColor);
        }}
        onBlur={() => {
          setborderWidth(1);
          setBorderColor('grey');
        }}
        style={{
          ...styles.input,
          borderBottomWidth: borderWidth,
          borderColor,
        }}
      />
    </>
  );
};

class CarChoiceScreen extends React.Component {
  state = {
    visible: false,
    borderWidth: 1,
    borderColor: 'grey',
    details: {},
  };

  modalX = new Animated.Value(deviceWidth);

  openModal = () => {
    this.setState({visible: true}, () => {
      Animated.timing(this.modalX, {
        useNativeDriver: false,
        duration: 300,
        toValue: 0,
      }).start();
    });
  };

  render() {
    var Modal = (
      <Animated.View
        style={[
          styles.modal,
          {transform: [{translateX: this.modalX}], position: 'absolute'},
        ]}>
        <KeyboardAvoidingView behavior="padding">
          <TouchableOpacity
            onPress={() => {
              this.modalX = new Animated.Value(deviceWidth);
              this.setState({visible: false});
            }}>
            <Ionicons
              name="ios-arrow-back"
              size={30}
              style={{marginBottom: 10}}
            />
          </TouchableOpacity>
          <TextComp bold style={styles.title}>
            Add Car
          </TextComp>
          <View style={{width: '100%', marginTop: 50}}>
            <View style={{height: '80%'}}>
              <CarInput
                auto
                label="Make"
                placeholder="Make (eg. Nissan, Audi)"
                value={this.state.details.make}
                onChangeText={(make) =>
                  this.setState({
                    details: {
                      ...this.state.details,
                      make,
                    },
                  })
                }
              />
              <CarInput
                label="Model"
                placeholder="Model (eg. Logan, Verna)"
                value={this.state.details.model}
                onChangeText={(model) =>
                  this.setState({
                    details: {
                      ...this.state.details,
                      model,
                    },
                  })
                }
              />
              <CarInput
                label="Color"
                placeholder="Color (eg. Black, Silver)"
                value={this.state.details.color}
                onChangeText={(color) =>
                  this.setState({
                    details: {
                      ...this.state.details,
                      color,
                    },
                  })
                }
              />
              <CarInput
                label="License plate"
                placeholder="License plate (eg. سجط ٢٥٩٤)"
                value={this.state.details.licensePlate}
                onChangeText={(licensePlate) =>
                  this.setState({
                    details: {
                      ...this.state.details,
                      licensePlate,
                    },
                  })
                }
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={() =>
                this.props
                  .add(this.props.user.uid, this.state.details)
                  .then(() => this.setState({visible: false}))
              }>
              <TextComp bold style={{color: 'white', fontSize: 16}}>
                Save
              </TextComp>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    );
    return (
      <>
        <FocusAwareStatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.screen}>
          {this.state.visible ? (
            Modal
          ) : (
            <View style={{paddingHorizontal: 20}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{alignItems: 'flex-start'}}
                onPress={this.props.onClose}>
                <Ionicons
                  name="ios-close"
                  size={35}
                  style={{marginBottom: 10}}
                />
              </TouchableOpacity>
              <TextComp bold style={styles.title}>
                Cars
              </TextComp>
              <View style={{width: '100%'}}>
                {this.props.user.cars.map((car, index) => (
                  <CarDetails
                    car={car}
                    key={index}
                    current={car.active}
                    onChoose={() => this.props.change(this.props.user.uid, car)}
                  />
                ))}
                <TouchableHighlight
                  underlayColor="whitesmoke"
                  onPress={this.openModal}
                  style={styles.addBtn}>
                  <>
                    <View style={{width: '15%'}}>
                      <Ionicons name="ios-add" size={30} />
                    </View>
                    <TextComp bold style={{fontSize: 20}}>
                      Add Car
                    </TextComp>
                  </>
                </TouchableHighlight>
              </View>
            </View>
          )}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 40,
  },
  label: {
    fontSize: 16,
  },
  btn: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: Colors.primaryColor,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  addBtn: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    marginVertical: 5,
    paddingVertical: 15,
  },
  modal: {
    height: deviceHeight,
    width: '90%',
    backgroundColor: 'white',
    marginTop: 35,
    alignSelf: 'center',
  },
  input: {
    paddingVertical: 15,
    marginVertical: 5,
    marginBottom: 20,
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {
  add: addCar,
  change: changeCar,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarChoiceScreen);

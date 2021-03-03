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
} from 'react-native';
import TextComp from '../components/TextComp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import CarDetails from '../components/CarDetails';
import Colors from '../constants/Colors';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const CarInput = (props) => {
  const [borderWidth, setborderWidth] = useState(1);
  const [borderColor, setBorderColor] = useState('grey');

  return (
    <>
      <TextComp style={styles.label}>Make</TextComp>
      <TextInput
        {...props}
        autoFocus={props.auto}
        value={props.value}
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
        placeholder={props.label}
      />
    </>
  );
};

class CarChoiceScreen extends React.Component {
  state = {
    visible: false,
    borderWidth: 1,
    borderColor: 'grey',
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
          <CarInput label="Make" value={this.state.make} auto />
          <CarInput label="Model" value={this.state.model} />
          <CarInput label="Color" value={this.state.colors} />
        </View>
      </Animated.View>
    );
    return (
      <SafeAreaView style={styles.screen}>
        {this.state.visible ? (
          Modal
        ) : (
          <View style={{paddingHorizontal: 20}}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{alignItems: 'flex-start'}}
              onPress={this.props.onClose}>
              <Ionicons name="ios-close" size={35} style={{marginBottom: 10}} />
            </TouchableOpacity>
            <TextComp bold style={styles.title}>
              Cars
            </TextComp>
            <View style={{width: '100%'}}>
              <CarDetails car={this.props.user.carDetails} current />
              <CarDetails
                car={{
                  make: 'Jeep',
                  model: 'Cherokee',
                  color: 'steelblue',
                  licensePlate: 'هفع ٣٥٤',
                }}
              />
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
    width: deviceWidth,
    backgroundColor: 'white',
    marginTop: 35,
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 15,
    marginVertical: 5,
    marginRight: 20,
    marginBottom: 20,
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CarChoiceScreen);

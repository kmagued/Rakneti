import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TextComp from '../components/TextComp';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import Colors from '../constants/Colors';
import {connect} from 'react-redux';
import {addLocation} from '../store/actions/locations';

Area = (props) => {
  const [numSpots, setNumSpots] = useState(null);
  const [availableSpots, setAvailableSpots] = useState(null);
  const [name, setName] = useState('');

  return (
    <>
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          marginVertical: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextComp bold style={{fontSize: 14, color: 'grey'}}>
          AREA {props.num}
        </TextComp>
        <TouchableOpacity onPress={props.onRemove}>
          <TextComp black style={{color: Colors.error}}>
            Remove
          </TextComp>
        </TouchableOpacity>
      </View>
      <CustomInput
        title="NAME"
        placeholder="Enter area name"
        value={name}
        onChangeText={(name) => {
          setName(name);
          props.onChange(name, numSpots, availableSpots);
        }}
      />
      <CustomInput
        title="NUMBER OF SPOTS"
        placeholder="Enter number of spots"
        value={numSpots}
        onChangeText={(num) => {
          setNumSpots(num);
          props.onChange(name, num, availableSpots);
        }}
      />
      <CustomInput
        title="AVAILABLE SPOTS"
        placeholder="Enter number of available spots"
        value={availableSpots}
        onChangeText={(available) => {
          setAvailableSpots(available);
          props.onChange(name, numSpots, available);
        }}
      />
    </>
  );
};

class AddLocation extends React.Component {
  state = {
    areas: [{name: '', numberOfSpots: null, availableSpots: null}],
    name: '',
    address: '',
    image: '',
    coordinates: {lat: '', lng: ''},
  };

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <Header
          centerComponent={
            <TextComp black style={{fontSize: 18, marginVertical: 10}}>
              ADD LOCATION
            </TextComp>
          }
        />
        <ScrollView>
          <View style={{width: '80%', alignSelf: 'center', marginVertical: 10}}>
            <TextComp bold style={{fontSize: 16, color: 'grey'}}>
              DETAILS
            </TextComp>
          </View>
          <CustomInput
            title="NAME"
            placeholder="Enter location name"
            value={this.state.name}
            onChangeText={(name) => {
              this.setState({name});
            }}
          />
          <CustomInput
            title="ADDRESS"
            placeholder="Enter location address"
            value={this.state.address}
            onChangeText={(address) => {
              this.setState({address});
            }}
          />
          <CustomInput
            title="IMAGE"
            placeholder="Enter image URL"
            value={this.state.image}
            onChangeText={(image) => {
              this.setState({image});
            }}
          />
          <View style={{width: '80%', alignSelf: 'center', marginVertical: 10}}>
            <TextComp bold style={{fontSize: 16, color: 'grey'}}>
              COORDINATES
            </TextComp>
          </View>
          <CustomInput
            title="LATITUDE"
            placeholder="Enter latitude"
            value={this.state.coordinates.lat}
            onChangeText={(lat) => {
              this.setState({coordinates: {...this.state.coordinates, lat}});
            }}
          />
          <CustomInput
            title="LONGITUDE"
            placeholder="Enter longitude"
            value={this.state.coordinates.lng}
            onChangeText={(lng) => {
              this.setState({coordinates: {...this.state.coordinates, lng}});
            }}
          />
          <View
            style={{
              width: '80%',
              alignSelf: 'center',
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextComp bold style={{fontSize: 16, color: 'grey'}}>
              PARKING AREAS
            </TextComp>
            <TouchableOpacity
              onPress={() => {
                this.setState({areas: [...this.state.areas, {}]});
              }}>
              <TextComp bold style={{color: 'grey', fontSize: 12}}>
                ADD AREA
              </TextComp>
            </TouchableOpacity>
          </View>

          {this.state.areas.map((item, index) => (
            <Area
              num={index + 1}
              key={index}
              onChange={(name, spots, available) => {
                const updatedArea = this.state.areas.find(
                  (area, id) => index === id,
                );
                updatedArea.name = name;
                updatedArea.availableSpots = available;
                updatedArea.numberOfSpots = spots;
              }}
              onRemove={() => {
                this.setState({
                  areas: this.state.areas.filter((area, id) => id !== index),
                });
              }}
            />
          ))}

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props
                .create(
                  this.state.name,
                  this.state.address,
                  this.state.image,
                  this.state.coordinates,
                  this.state.areas,
                )
                .then(() => {
                  this.props.navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeNav'}],
                  });
                });
            }}>
            <TextComp bold style={{color: 'white'}}>
              CREATE
            </TextComp>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  btn: {
    backgroundColor: '#333333',
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
});

const mapDispatchToProps = {
  create: addLocation,
};

export default connect(null, mapDispatchToProps)(AddLocation);

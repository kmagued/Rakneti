import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import TextComp from '../components/TextComp';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ParkingAreas extends React.Component {
  renderLocation = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.locationContainer}
        activeOpacity={0.7}
        onPress={() => {
          this.props.navigation.navigate('ParkingDetail', {
            parkingName: itemData.item.name,
          });
        }}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={{uri: itemData.item.image}}>
          <View style={{backgroundColor: 'rgba(0,0,0,0.5)', height: '100%'}}>
            <View style={styles.textContainer}>
              <TextComp black style={styles.text}>
                {itemData.item.name.toUpperCase()}
              </TextComp>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <Header
          centerComponent={
            <TextComp bold style={styles.title}>
              ALL PARKING AREAS
            </TextComp>
          }
          leftComponent={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="ios-arrow-back" size={30} />
            </TouchableOpacity>
          }
        />
        <FlatList
          data={this.props.locations}
          renderItem={this.renderLocation}
          keyExtractor={(item) =>
            `${item.coordinates.lat},${item.coordinates.lng}`
          }
        />
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
    fontSize: 18,
    padding: 5,
  },
  locationContainer: {
    marginVertical: 2,
    height: 130,
  },
  textContainer: {
    height: '90%',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

const mapStateToProps = (state) => ({
  locations: state.locations.locations,
});

export default connect(mapStateToProps)(ParkingAreas);

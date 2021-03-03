import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import TextComp from '../components/TextComp';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import {StatusBar} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
          style={{width: '100%', height: '100%', justifyContent: 'flex-end'}}
          source={{uri: itemData.item.image}}>
          <View
            style={{
              height: '30%',
              backgroundColor: 'whitesmoke',
              justifyContent: 'center',
            }}>
            <TextComp bold style={styles.text}>
              {itemData.item.name}
            </TextComp>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.screen}>
          <Header
            centerComponent={
              <TextComp bold style={styles.title}>
                Parking Areas
              </TextComp>
            }
            leftComponent={
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Ionicons
                  name="ios-arrow-back"
                  size={30}
                  color={Colors.secondary}
                />
              </TouchableOpacity>
            }
          />
          <FlatList
            style={{marginTop: 10}}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.props.locations}
            renderItem={this.renderLocation}
            keyExtractor={(item) =>
              `${item.coordinates.lat},${item.coordinates.lng}`
            }
          />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: Colors.secondary,
  },
  locationContainer: {
    margin: 5,
    height: 200,
    width: SCREEN_WIDTH / 2.3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  textContainer: {
    alignItems: 'flex-start',
    height: '55%',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    fontSize: 16,
    padding: 10,
  },
});

const mapStateToProps = (state) => ({
  locations: state.locations.locations,
});

export default connect(mapStateToProps)(ParkingAreas);

import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import Colors from '../constants/Colors';
import TextComp from '../components/TextComp';
import {getLocations} from '../store/actions/locations';
import {getUserLocation} from '../store/actions/locations';
import {connect} from 'react-redux';
import SwipeList from 'react-native-swiper-flatlist';
import FeaturedLocation from '../components/FeaturedLocation';
import ReservationContainer from '../components/ReservationContainer';
import Location from '../components/Location';

class HomeScreen extends React.Component {
  state = {
    featuredLocation: {},
  };

  renderPlace = (itemData) =>
    //Render 3 parking areas only
    itemData.index < 3 && (
      <Location
        place={itemData.item}
        onPress={() => {
          this.props.navigation.navigate('ParkingDetail', {
            parkingName: itemData.item.name,
          });
        }}
      />
    );

  componentDidMount() {
    this.props.getUserLocation();
    this.props.get().then(() => {
      this.setState({
        featuredLocation: this.props.locations.find(
          (location) => location.name === 'American University in Cairo',
        ),
      });
    });
  }

  shuffle = (array) => array.sort(() => Math.random() - 0.5);

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.screen}>
          <FeaturedLocation
            location={this.state.featuredLocation}
            onSearch={() => this.props.navigation.navigate('Search')}
            onOpenMap={() => this.props.navigation.navigate('Map')}
          />
          {this.props.didReserve && (
            <ReservationContainer
              onPress={() => this.props.navigation.navigate('Reservation')}
            />
          )}
          <View style={styles.container}>
            <TextComp bold style={{fontSize: 22, padding: 20}}>
              Most popular
            </TextComp>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ParkingAreas')}>
              <TextComp bold style={{color: Colors.primaryColor}}>
                View all
              </TextComp>
            </TouchableOpacity>
          </View>
          <View style={{marginHorizontal: 10}}>
            <SwipeList
              autoplay
              autoplayLoop
              autoplayDelay={4}
              autoplayLoopKeepAnimation
              horizontal
              data={this.shuffle(
                this.props.locations.filter(
                  (location) =>
                    location.name !== this.state.featuredLocation.name,
                ),
              )}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) =>
                `${item.coordinates.lat},${item.coordinates.lng}`
              }
              renderItem={this.renderPlace}
            />
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
  },
});

const mapStateToProps = (state) => ({
  locations: state.locations.locations,
  didReserve: state.users.didReserve,
  userLocation: state.users.location,
  nearby: state.locations.nearbyLocations,
});

const mapDispatchToProps = {
  get: getLocations,
  getUserLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

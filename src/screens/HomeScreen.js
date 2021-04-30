import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/Colors';
import TextComp from '../components/TextComp';
import {getLocations} from '../store/actions/locations';
import {
  getUserLocation,
  didReserveSpot,
  didArrive,
} from '../store/actions/locations';
import {connect} from 'react-redux';
import SwipeList from 'react-native-swiper-flatlist';
import FeaturedLocation from '../components/FeaturedLocation';
import ReservationContainer from '../components/ReservationContainer';
import Location from '../components/Location';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

class HomeScreen extends React.Component {
  state = {
    featuredLocation: {},
    loading: true,
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

  renderNearby = (itemData) => (
    <TouchableOpacity
      style={styles.nearbyPlace}
      activeOpacity={0.8}
      onPress={() =>
        this.props.navigation.navigate('ParkingDetail', {
          parkingName: itemData.item.name,
        })
      }>
      <ImageBackground
        source={{uri: itemData.item.image}}
        style={{width: '100%', height: '100%'}}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 15,
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.2)',
            justifyContent: 'flex-end',
          }}>
          <TextComp style={{color: 'white', fontSize: 12, marginBottom: 5}}>
            Tagamoa
          </TextComp>
          <TextComp black style={{color: 'white', fontSize: 14}}>
            {itemData.item.name}
          </TextComp>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  renderEmpty = () => (
    <View style={{paddingHorizontal: 10}}>
      <TextComp>There are no parkings near you</TextComp>
    </View>
  );

  componentDidMount() {
    this.props.get().then(() => {
      this.props.didReserveSpot(this.props.user.uid, this.props.locations);
      this.props.getUserLocation();
      this.setState({
        featuredLocation: this.props.locations.find(
          (location) => location.name === 'Cairo Festival City',
        ),
        loading: false,
      });
    });
    setInterval(() => {
      this.props.didArrive(this.props.user.uid);
    }, 500);
  }

  shuffle = (array) => array.sort(() => Math.random() - 0.5);

  render() {
    return (
      <>
        <ScrollView
          scrollEnabled={this.state.scroll}
          style={styles.screen}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <FocusAwareStatusBar barStyle="light-content" />
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
          {this.state.loading ? (
            <View style={{marginTop: 20}}>
              <ActivityIndicator />
            </View>
          ) : (
            <>
              {this.props.nearby && (
                <>
                  <View style={styles.container}>
                    <TextComp
                      bold
                      style={{fontSize: 18, paddingHorizontal: 20}}>
                      Nearby Parkings
                    </TextComp>
                  </View>
                  <View style={{marginHorizontal: 10}}>
                    <FlatList
                      ListEmptyComponent={this.renderEmpty}
                      horizontal
                      data={this.props.nearby}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item) =>
                        `${item.coordinates.lat},${item.coordinates.lng}`
                      }
                      renderItem={this.renderNearby}
                    />
                  </View>
                </>
              )}
              <View style={styles.container}>
                <TextComp bold style={{fontSize: 18, paddingHorizontal: 20}}>
                  Top Rated
                </TextComp>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ParkingAreas')
                  }>
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
            </>
          )}
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
    marginVertical: 15,
  },
  nearbyPlace: {
    width: 160,
    height: 200,
    marginHorizontal: 7,
    borderRadius: 15,
    overflow: 'hidden',
  },
});

const mapStateToProps = (state) => ({
  locations: state.locations.locations,
  didReserve: state.users.didReserve,
  userLocation: state.locations.userLocation,
  nearby: state.locations.nearbyLocations,
  user: state.users.user,
  arrived: state.users.didArrive,
});

const mapDispatchToProps = {
  get: getLocations,
  getUserLocation,
  didReserveSpot,
  didArrive,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

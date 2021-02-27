import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

//Constants & Components
import MapView, {Marker, PROVIDER_GOOGLE, Circle} from 'react-native-maps';
import Colors from '../constants/Colors';
import TextComp from '../components/TextComp';
import SwiperList from 'react-native-swiper-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Redux & Methods
import {connect} from 'react-redux';
import {getDistance} from 'geolib';
import {getUserLocation} from '../store/actions/locations';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CIRCLE_RADIUS = 3000;
const LATITUDE_DELTA = 0.0622;
const LONGITUDE_DELTA = 0.0621;

class MapScreen extends React.Component {
  LATLNG = {
    latitude: this.props.userLocation.lat,
    longitude: this.props.userLocation.lng,
  };

  state = {
    userRegion: {
      ...this.LATLNG,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA,
    },
    region: {
      ...this.LATLNG,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA,
    },
    availableAreas: [],
    show: false,
    userLocation: {},
    changed: false,
  };

  renderEmpty = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 20,
        flex: 1,
        alignItems: 'center',
      }}>
      <TextComp style={{fontSize: 16}}>No locations found!</TextComp>
    </View>
  );

  onLocationChange = (region) => {
    this._mounted &&
      this.setState({
        userRegion: {
          latitude: region.nativeEvent.coordinate.latitude,
          longitude: region.nativeEvent.coordinate.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      });
    const availableLocations =
      this._mounted && this.calculateDistance(region.nativeEvent.coordinate);
    this._mounted && this.setState({availableAreas: availableLocations});
  };

  calculateDistance = (newLoc) => {
    this.setState({availableAreas: []});
    let areas = [];

    this.props.locations.forEach((loc) => {
      let distance = getDistance(
        {
          latitude: loc.coordinates.lat,
          longitude: loc.coordinates.lng,
        },
        {
          latitude: newLoc.latitude,
          longitude: newLoc.longitude,
        },
      );
      if (distance < CIRCLE_RADIUS) {
        areas.push(loc);
      }
    });

    return areas;
  };

  renderNearbyLocation = (itemData) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        this.props.navigation.navigate('ParkingDetail', {
          parkingName: itemData.item.name,
        })
      }
      style={{
        width: SCREEN_WIDTH,
        alignItems: 'center',
      }}>
      <View style={{height: 120, width: '100%'}}>
        <Image
          source={{uri: itemData.item.image}}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View
        style={{
          backgroundColor: 'rgb(248, 249, 253)',
          width: '100%',
          alignItems: 'center',
        }}>
        <TextComp bold style={{fontSize: 18, padding: 10}}>
          {itemData.item.name}
        </TextComp>
      </View>
    </TouchableOpacity>
  );

  onPressMarker = (location, latlng) => {
    const id = this.state.availableAreas.findIndex(
      (area) => area.name === location.name,
    );
    if (id !== -1)
      this.setState({show: true}, () => {
        this.list.scrollToIndex({index: id});
      });
    this.map.animateToRegion({
      ...latlng,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0321,
    });
  };

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
    this.props.getUserLocation();
  }

  render() {
    var mapStyle = [
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#f5f5f5',
          },
        ],
      },
      {
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161',
          },
        ],
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#f5f5f5',
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'administrative.land_parcel',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#bdbdbd',
          },
        ],
      },
      {
        featureType: 'administrative.neighborhood',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#eeeeee',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e5e5e5',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          {
            weight: 1,
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#dadada',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: Colors.secondary,
            weight: 2,
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161',
          },
        ],
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e',
          },
        ],
      },
      {
        featureType: 'transit',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e5e5e5',
          },
        ],
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [
          {
            color: '#eeeeee',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#c9c9c9',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e',
          },
        ],
      },
    ];

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.screen}>
          <MapView
            ref={(ref) => (this.map = ref)}
            style={styles.map}
            showsMyLocationButton
            onUserLocationChange={this.onLocationChange}
            showsUserLocation
            provider={PROVIDER_GOOGLE}
            zoomTapEnabled
            zoomEnabled
            customMapStyle={mapStyle}
            initialRegion={this.state.region}
            onRegionChange={(region) => {
              this.setState({region, changed: true}, () => {
                this.circle.setNativeProps({
                  fillColor: 'rgba(52, 212, 132, 0.3)',
                });
              });
            }}>
            <TouchableOpacity
              style={{paddingTop: 60, paddingLeft: 20}}
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back"
                size={30}
                color={Colors.secondary}
              />
            </TouchableOpacity>
            {this.state.changed && (
              <Circle
                ref={(ref) => (this.circle = ref)}
                center={this.state.userRegion}
                radius={CIRCLE_RADIUS}
                fillColor="rgba(52,212,132, 0.3)"
                strokeWidth={0}
              />
            )}
            {this.props.locations.map((location, index) => {
              const latlng = {
                latitude: parseFloat(location.coordinates.lat),
                longitude: parseFloat(location.coordinates.lng),
              };
              return (
                this.state.availableAreas.find(
                  (loc) => loc.name === location.name,
                ) && (
                  <Marker
                    key={index}
                    coordinate={latlng}
                    ref={(ref) => (this.marker = ref)}
                    onPress={() => this.onPressMarker(location, latlng)}
                  />
                )
              );
            })}
          </MapView>
          <View style={{width: '100%', position: 'absolute'}}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.nearbyContainer}
              onPress={() => {
                this.setState({show: !this.state.show}, () => {
                  this.state.availableAreas.length > 0 &&
                    this.map.animateToRegion({
                      latitude: parseFloat(
                        this.state.availableAreas[0].coordinates.lat,
                      ),
                      longitude: parseFloat(
                        this.state.availableAreas[0].coordinates.lng,
                      ),
                      latitudeDelta: this.state.show ? 0.0222 : LATITUDE_DELTA,
                      longitudeDelta: this.state.show
                        ? 0.0321
                        : LONGITUDE_DELTA,
                    });
                });
              }}>
              <TextComp
                bold
                style={{fontSize: 18, color: 'white', paddingVertical: 15}}>
                Nearby locations
              </TextComp>
              <Ionicons
                name={this.state.show ? 'ios-chevron-down' : 'ios-chevron-up'}
                color="white"
                size={25}
              />
            </TouchableOpacity>
            {this.state.show && (
              <SwiperList
                ref={(ref) => (this.list = ref)}
                ListEmptyComponent={this.renderEmpty}
                data={this.state.availableAreas}
                keyExtractor={(item) => item.name}
                renderItem={this.renderNearbyLocation}
                onChangeIndex={(item) => {
                  this.map.animateToRegion({
                    latitude: parseFloat(
                      this.state.availableAreas[item.index].coordinates.lat,
                    ),
                    longitude: parseFloat(
                      this.state.availableAreas[item.index].coordinates.lng,
                    ),
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0321,
                  });
                }}
                contentContainerStyle={{
                  flex: this.state.availableAreas.length === 0 ? 1 : null,
                }}
              />
            )}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  container: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  marker: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  showBtn: {
    alignSelf: 'center',
    backgroundColor: Colors.primaryColor,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  nearbyContainer: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = (state) => ({
  userLocation: state.users.location,
  locations: state.locations.locations,
});

const mapDispatchToProps = {
  getUserLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

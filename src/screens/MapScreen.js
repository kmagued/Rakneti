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
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Colors from '../constants/Colors';
import TextComp from '../components/TextComp';
import SwiperList from 'react-native-swiper-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Redux & Methods
import {connect} from 'react-redux';
import {getDistance} from 'geolib';
import {getUserLocation} from '../store/actions/locations';
import {Platform} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CIRCLE_RADIUS = 4000;
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
    show: false,
    userLocation: {},
    curIndex: null,
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
    const id = this.props.nearby.findIndex(
      (area) => area.name === location.name,
    );
    if (id !== -1)
      this.setState({show: true, curIndex: id}, () => {
        this.list.scrollToIndex({index: id});
      });
    this.map.animateToRegion({
      ...latlng,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0321,
    });
  };

  componentWillUnmount() {
    this.props.getUserLocation();
  }

  shouldComponentUpdate(prevProps) {
    return prevProps.nearby !== this.props.nearby || this.props.locations;
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
            color: 'grey',
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
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
        />
        <View style={styles.screen}>
          <MapView
            ref={(ref) => (this.map = ref)}
            style={styles.map}
            showsUserLocation
            provider={PROVIDER_GOOGLE}
            zoomTapEnabled
            zoomEnabled
            customMapStyle={mapStyle}
            initialRegion={this.state.region}
            onRegionChangeComplete={(region) => {
              this.setState({region});
            }}>
            {Platform.OS === 'ios' && (
              <TouchableOpacity
                style={{paddingTop: 60, paddingLeft: 20}}
                onPress={() => this.props.navigation.goBack()}>
                <Ionicons
                  name="ios-arrow-back"
                  size={30}
                  color={Colors.secondary}
                />
              </TouchableOpacity>
            )}
            {/* Markers */}
            {this.props.locations.map((location, index) => {
              const latlng = {
                latitude: parseFloat(location.coordinates.lat),
                longitude: parseFloat(location.coordinates.lng),
              };
              const id = this.props.nearby.findIndex(
                (area) => area.name === location.name,
              );

              return (
                this.props.nearby.find((loc) => loc.name === location.name) && (
                  <Marker
                    key={index}
                    tracksInfoWindowChanges={false}
                    coordinate={latlng}
                    ref={(ref) => (this.marker = ref)}
                    onPress={() => this.onPressMarker(location, latlng)}>
                    <View style={{width: 120, alignItems: 'center'}}>
                      {id === this.state.curIndex && (
                        <TextComp
                          black
                          numOfLines={2}
                          style={{
                            textAlign: 'center',
                            color: Colors.secondary,
                          }}>
                          {location.name}
                        </TextComp>
                      )}
                      <Ionicons
                        name="ios-location-sharp"
                        size={id === this.state.curIndex ? 40 : 30}
                        color={
                          id === this.state.curIndex
                            ? Colors.primaryColor
                            : 'grey'
                        }
                      />
                    </View>
                  </Marker>
                )
              );
            })}
          </MapView>
          <View style={{width: '100%', position: 'absolute'}}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.nearbyContainer}
              onPress={() => {
                this.setState(
                  {
                    show: !this.state.show,
                    curIndex: !this.state.show ? 0 : null,
                  },
                  () => {
                    this.props.nearby.length > 0 &&
                      this.map.animateToRegion({
                        latitude: parseFloat(
                          this.props.nearby[0].coordinates.lat,
                        ),
                        longitude: parseFloat(
                          this.props.nearby[0].coordinates.lng,
                        ),
                        latitudeDelta: this.state.show
                          ? 0.0222
                          : LATITUDE_DELTA,
                        longitudeDelta: this.state.show
                          ? 0.0321
                          : LONGITUDE_DELTA,
                      });
                  },
                );
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
            {/* Nearby Areas List */}
            {this.state.show && (
              <SwiperList
                ref={(ref) => (this.list = ref)}
                ListEmptyComponent={this.renderEmpty}
                data={this.props.nearby}
                keyExtractor={(item) => item.name}
                renderItem={this.renderNearbyLocation}
                onChangeIndex={(item) => {
                  this.setState({curIndex: item.index}, () => {
                    this.map.animateToRegion({
                      latitude: parseFloat(
                        this.props.nearby[item.index].coordinates.lat,
                      ),
                      longitude: parseFloat(
                        this.props.nearby[item.index].coordinates.lng,
                      ),
                      latitudeDelta: 0.0222,
                      longitudeDelta: 0.0321,
                    });
                  });
                }}
                contentContainerStyle={{
                  flex: this.props.nearby.length === 0 ? 1 : null,
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
  userLocation: state.locations.userLocation,
  locations: state.locations.locations,
  nearby: state.locations.nearbyLocations,
});

const mapDispatchToProps = {
  getUserLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

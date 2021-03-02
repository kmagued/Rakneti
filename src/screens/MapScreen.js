import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from 'react-native';

//Constants & Components
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Colors from '../constants/Colors';
import TextComp from '../components/TextComp';
import SwiperList from 'react-native-swiper-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapItems from '../constants/Map';

//Redux & Methods
import {connect} from 'react-redux';
import {
  getUserLocation,
  setUserLocation,
  selectMarker,
} from '../store/actions/locations';

const SCREEN_WIDTH = Dimensions.get('window').width;

class MapScreen extends React.Component {
  LATLNG = {
    latitude: this.props.userLocation.latitude,
    longitude: this.props.userLocation.longitude,
  };

  state = {
    region: {
      ...this.LATLNG,
      longitudeDelta: MapItems.longitudeDelta,
      latitudeDelta: MapItems.latitudeDelta,
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

  onLocationChange = (region) => {
    this.props.set({
      latitude: region.nativeEvent.coordinate.latitude,
      longitude: region.nativeEvent.coordinate.longitude,
    });
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
    this.props.selectMarker(location);
    const id = this.props.nearby.findIndex(
      (area) => area.name === location.name,
    );

    this.setState({show: true, curIndex: id}, () => {
      this.list.scrollToIndex({index: id});
      this.map.animateToRegion({
        ...latlng,
        latitudeDelta: MapItems.focusedLatitudeDelta,
        longitudeDelta: MapItems.focusedLongitudeDelta,
      });
    });
  };

  onShowList = () => {
    !this.state.show
      ? this.props.selectMarker(this.props.nearby[0])
      : this.props.selectMarker(null);
    this.setState(
      {
        show: !this.state.show,
        curIndex: !this.state.show ? 0 : null,
      },
      () => {
        this.props.nearby.length > 0 &&
          this.map.animateToRegion({
            latitude: parseFloat(this.props.nearby[0].coordinates.lat),
            longitude: parseFloat(this.props.nearby[0].coordinates.lng),
            latitudeDelta: this.state.show
              ? MapItems.focusedLatitudeDelta
              : MapItems.latitudeDelta,
            longitudeDelta: this.state.show
              ? MapItems.focusedLongitudeDelta
              : MapItems.longitudeDelta,
          });
      },
    );
  };

  onChangeListItem = (item) => {
    this.props.selectMarker(this.props.nearby[item.index]);
    this.setState({curIndex: item.index}, () => {
      this.map.animateToRegion({
        latitude: parseFloat(this.props.nearby[item.index].coordinates.lat),
        longitude: parseFloat(this.props.nearby[item.index].coordinates.lng),
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0321,
      });
    });
  };

  componentWillUnmount() {
    this.props.getUserLocation();
  }

  shouldComponentUpdate(prevProps) {
    return (
      prevProps.nearby !== this.props.nearby ||
      prevProps.userLocation !== this.props.userLocation ||
      prevProps.selected !== this.props.selected
    );
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
            onUserLocationChange={this.onLocationChange}
            provider={PROVIDER_GOOGLE}
            zoomTapEnabled
            zoomEnabled
            customMapStyle={mapStyle}
            initialRegion={this.state.region}
            onRegionChangeComplete={(region) => {
              this.setState({region});
            }}>
            {/* Back Button */}
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
            {/* Show location Button */}
            <TouchableOpacity
              onPress={() => {
                this.map.animateToRegion({
                  longitude: this.props.userLocation.longitude,
                  latitude: this.props.userLocation.latitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                });
              }}
              style={styles.showLocationBtn}
              activeOpacity={0.8}>
              <MaterialIcons
                name="my-location"
                size={30}
                color={Colors.secondary}
              />
            </TouchableOpacity>
            {/* Show List */}
            <TouchableOpacity
              activeOpacity={1}
              style={styles.showListBtn}
              onPress={this.onShowList}>
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
                onChangeIndex={this.onChangeListItem}
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
  showListBtn: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showLocationBtn: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

const mapStateToProps = (state) => ({
  userLocation: state.locations.userLocation,
  locations: state.locations.locations,
  nearby: state.locations.nearbyLocations,
  selected: state.locations.selectedLocation,
});

const mapDispatchToProps = {
  getUserLocation,
  set: setUserLocation,
  selectMarker,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

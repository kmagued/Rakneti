import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import TextComp from '../components/TextComp';
import Colors from '../constants/Colors';
import {Overlay} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {
  addToBookmarkedLocations,
  removeFromBookmarkedLocations,
  reserveLocation,
  updateLocations,
} from '../store/actions/locations';
import CarChoice from '../screens/CarChoice';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class ParkingAreaDetailScreen extends React.Component {
  state = {
    visible: false,
    activeArea: {},
    logVisible: false,
    carOverlayVisible: false,
  };

  componentDidMount() {
    this._isMounted = true;
    setInterval(() => {
      this.props.update(this.props.route.params.parkingName).then(() => {
        this._isMounted && this.setState({update: true});
      });
    }, 500);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  bookmarkHandler = (parking) => {
    if (!this.bookmarked) {
      this.props.add(this.props.user.uid, parking);
      this.setState({logVisible: true});
      setTimeout(() => {
        this._isMounted && this.setState({logVisible: false});
      }, 2000);
    } else {
      this.props.remove(this.props.user.uid, parking);
    }
  };

  render() {
    const parkingName = this.props.route.params.parkingName;
    const parking = this.props.locations.find(
      (location) => location.name === parkingName,
    );
    const {bookmarkedLocations} = this.props.user;
    if (bookmarkedLocations) {
      this.bookmarked = Object.values(bookmarkedLocations).find(
        (location) => location.name === parking.name,
      );
    }

    return (
      <View style={styles.screen}>
        <Overlay
          backdropStyle={{backgroundColor: 'transparent'}}
          animationType="slide"
          isVisible={this.state.visible}
          overlayStyle={styles.overlay}
          onBackdropPress={() =>
            this.setState({visible: false, activeArea: {}, index: null})
          }>
          <>
            <Overlay
              isVisible={this.state.carOverlayVisible}
              overlayStyle={{flex: 1, width: '100%'}}
              animationType="slide">
              <CarChoice
                onClose={() => {
                  this.setState({carOverlayVisible: false});
                }}
              />
            </Overlay>
            <View style={{flex: 1}}>
              <View style={{flex: 0.2, justifyContent: 'center'}}>
                <TextComp bold style={styles.title}>
                  Reserve Spot
                </TextComp>
              </View>
              <View
                style={{
                  flex: 0.5,
                  paddingHorizontal: 20,
                  justifyContent: 'space-around',
                }}>
                <View style={{marginBottom: 30}}>
                  <TextComp black style={{fontSize: 24, marginBottom: 7}}>
                    {this.state.activeArea.name}
                  </TextComp>
                  <TextComp
                    bold
                    style={{fontSize: 32, color: Colors.secondary}}>
                    {this.state.activeArea.numberOfSpots -
                      this.state.activeArea.availableSpots}
                    <TextComp style={{color: 'grey', fontSize: 24}}>
                      /{this.state.activeArea.numberOfSpots}
                    </TextComp>
                  </TextComp>
                </View>
                <TouchableHighlight
                  onPress={() => {
                    this.setState({carOverlayVisible: true});
                  }}
                  style={{paddingVertical: 10, borderRadius: 10}}
                  underlayColor="whitesmoke">
                  <View style={styles.row}>
                    <TextComp black style={{fontSize: 16}}>
                      Vehicle
                    </TextComp>
                    <TextComp style={{color: 'grey'}}>
                      {this.props.user.carDetails.make}{' '}
                      {this.props.user.carDetails.model}
                    </TextComp>
                  </View>
                </TouchableHighlight>
                <View>
                  <View style={styles.row}>
                    <TextComp black style={{fontSize: 16}}>
                      License Plate
                    </TextComp>
                    <TextComp style={{color: 'grey'}}>
                      {this.props.user.carDetails.licensePlate}
                    </TextComp>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.props.didReserve ||
                this.state.activeArea.availableSpots == 0 ||
                !this.props.nearby.find((loc) => loc.name === parking.name) ? (
                  <View style={{padding: 10, width: '80%'}}>
                    <TextComp
                      bold
                      style={{
                        color: Colors.primaryColor,
                        fontSize: 22,
                        textAlign: 'center',
                      }}>
                      {this.props.didReserve
                        ? 'Already Reserved'
                        : !this.props.nearby.find(
                            (loc) => loc.name === parking.name,
                          )
                        ? 'Out of Range'
                        : 'Area is FULL'}
                    </TextComp>
                  </View>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btn}
                    onPress={() => {
                      this.setState({visible: false});
                      this.props
                        .reserve(
                          parking,
                          this.state.activeArea,
                          this.state.index,
                          this.props.user.uid,
                        )
                        .then(() => {
                          this.props.navigation.reset({
                            index: 0,
                            routes: [{name: 'HomeNav'}],
                          });
                          this.props.navigation.navigate('HomeNav', {
                            screen: 'Reservation',
                          });
                        });
                    }}>
                    <TextComp bold style={{color: 'white', fontSize: 16}}>
                      Reserve
                    </TextComp>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </>
        </Overlay>
        <ScrollView
          overScrollMode="never"
          contentContainerStyle={{flex: 1}}
          bounces={false}>
          <View style={styles.photo}>
            <ImageBackground
              source={{uri: parking.image}}
              style={{width: '100%', height: '100%'}}>
              <SafeAreaView
                style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-back" size={30} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.bookmarkHandler(parking)}
                    style={{alignSelf: 'flex-end'}}>
                    {this.bookmarked ? (
                      <FontAwesome name="heart" size={24} color="white" />
                    ) : (
                      <Feather name="heart" size={25} color="white" />
                    )}
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </ImageBackground>
          </View>
          <View style={{padding: 20}}>
            <View style={{width: '95%'}}>
              <TextComp black style={{fontSize: 20, marginBottom: 10}}>
                {parking.name}
              </TextComp>
              <TextComp>{parking.address}</TextComp>
            </View>
          </View>

          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            {Object.values(parking.parkingAreas).map((area, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                underlayColor="rgba(255,255,255,0.2)"
                style={{
                  ...styles.areaContainer,
                  backgroundColor: 'whitesmoke',
                }}
                onPress={() => {
                  this.setState({visible: true, activeArea: area, index});
                }}>
                <TextComp style={styles.areaNameText}>{area.name}</TextComp>
                <View>
                  <TextComp bold style={{fontSize: 22, color: 'grey'}}>
                    {area.numberOfSpots - area.availableSpots}
                    <TextComp style={{fontSize: 14}}>
                      /{area.numberOfSpots}
                    </TextComp>
                  </TextComp>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  carOverlay: {
    height: '100%',
    width: '100%',
  },
  areaContainer: {
    padding: 20,
    margin: 5,
    borderRadius: 15,
    width: SCREEN_WIDTH / 3.42,
    height: SCREEN_WIDTH / 3.42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaNameText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
    color: 'grey',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photo: {
    width: '100%',
    height: '40%',
  },
  address: {
    alignSelf: 'center',
    marginBottom: 10,
    textAlign: 'center',
  },
  overlay: {
    width: '100%',
    height: SCREEN_HEIGHT / 2.2,
    position: 'absolute',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    bottom: 0,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  btn: {
    backgroundColor: Colors.primaryColor,
    padding: 15,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  locations: state.locations.locations,
  didReserve: state.users.didReserve,
  nearby: state.locations.nearbyLocations,
});

const mapDispatchToProps = {
  reserve: reserveLocation,
  add: addToBookmarkedLocations,
  remove: removeFromBookmarkedLocations,
  update: updateLocations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ParkingAreaDetailScreen);

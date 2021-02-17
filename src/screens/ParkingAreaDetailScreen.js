import React, {Fragment} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import TextComp from '../components/TextComp';
import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';
import {Overlay} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {reserve} from '../store/actions/users';
import {
  addToBookmarkedLocations,
  removeFromBookmarkedLocations,
} from '../store/actions/locations';

class ParkingAreaDetailScreen extends React.Component {
  state = {
    visible: false,
    activeArea: {},
    logVisible: false,
  };

  componentDidMount() {
    this._isMounted = true;
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
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: Colors.secondary}} />
        <View style={styles.screen}>
          <Overlay
            isVisible={this.state.visible}
            overlayStyle={styles.overlay}
            onBackdropPress={() => {
              this.setState({visible: false, activeArea: {}});
            }}>
            <View style={{alignItems: 'center'}}>
              <TextComp bold style={styles.title}>
                {this.state.activeArea.name}
              </TextComp>
              <TextComp
                bold
                style={{fontSize: 32, marginBottom: 20, color: '#333333'}}>
                {this.state.activeArea.numberOfSpots -
                  this.state.activeArea.availableSpots}
                <TextComp style={{color: Colors.secondary, fontSize: 25}}>
                  /{this.state.activeArea.numberOfSpots}
                </TextComp>
              </TextComp>

              {this.props.didReserve ? (
                <TextComp
                  bold
                  style={{
                    color: Colors.primaryColor,
                    fontSize: 20,
                    width: '70%',
                    textAlign: 'center',
                  }}>
                  You already reserved a spot
                </TextComp>
              ) : (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    this.setState({visible: false});
                    this.props
                      .reserve(parking, this.state.activeArea)
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
                    Reserve Spot
                  </TextComp>
                </TouchableOpacity>
              )}
            </View>
          </Overlay>
          <View style={styles.screenTitleContainer}>
            <View style={{flex: 0.99, alignItems: 'center'}}>
              <TextComp style={{color: 'white', fontSize: 20}}>
                {parking.name}
              </TextComp>
            </View>
            <Ionicons
              name={this.bookmarked ? 'ios-heart' : 'ios-heart-outline'}
              size={25}
              color="white"
              onPress={() => this.bookmarkHandler(parking)}
            />
          </View>
          <ScrollView>
            <View style={styles.body}>
              <TextComp style={styles.address}>{parking.address}</TextComp>
              <View style={styles.map}>
                <MapPreview markers selectedLocation={parking.coordinates} />
              </View>
              <TextComp style={{fontSize: 20, margin: 10}}>
                Pick Parking Area
              </TextComp>
              {Object.values(parking.parkingAreas).map((area, index) => (
                <TouchableOpacity
                  style={styles.areaContainer}
                  key={index}
                  activeOpacity={0.5}
                  disabled={area.availableSpots === 0}
                  onPress={() => {
                    this.setState({visible: true, activeArea: area});
                  }}>
                  <TextComp style={{color: 'grey', fontSize: 16}}>
                    {area.name}
                    <TextComp
                      style={{color: Colors.primaryColor, fontSize: 14}}>
                      {' '}
                      {area.availableSpots === 1
                        ? '(1 spot left)'
                        : area.availableSpots < 5 && area.availableSpots > 0
                        ? `(${area.availableSpots} spots left)`
                        : null}
                    </TextComp>
                  </TextComp>
                  <View>
                    <TextComp
                      bold
                      style={{
                        fontSize: 22,
                        color:
                          area.availableSpots === 0
                            ? Colors.primaryColor
                            : 'grey',
                      }}>
                      {area.numberOfSpots - area.availableSpots}
                      <TextComp style={{fontSize: 14}}>
                        /{area.numberOfSpots}
                      </TextComp>
                    </TextComp>
                  </View>
                </TouchableOpacity>
              ))}
              {this.state.logVisible ? (
                <View style={styles.log}>
                  <TextComp style={{textAlign: 'center', color: 'white'}}>
                    <TextComp bold>{parking.name}</TextComp> was added to your
                    bookmarks list
                  </TextComp>
                </View>
              ) : null}
            </View>
          </ScrollView>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 15,
  },
  screenTitleContainer: {
    backgroundColor: Colors.secondary,
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  areaContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 7,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  log: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    borderRadius: 25,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 20,
    position: 'absolute',
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
    overflow: 'hidden',
    marginBottom: 10,
  },
  address: {
    alignSelf: 'center',
    marginBottom: 10,
    textAlign: 'center',
  },
  overlay: {
    height: 200,
    width: Dimensions.get('window').width / 1.2,
    borderRadius: 20,
    paddingVertical: 20,
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
});

const mapDispatchToProps = {
  reserve,
  add: addToBookmarkedLocations,
  remove: removeFromBookmarkedLocations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ParkingAreaDetailScreen);

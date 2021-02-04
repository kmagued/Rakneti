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
import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';
import {Overlay} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ParkingAreaDetailScreen extends React.Component {
  state = {
    visible: false,
    activeArea: {},
    isBookmarked: false,
    logVisible: false,
  };

  render() {
    const {parking} = this.props.route.params;

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
              <TextComp style={{fontSize: 32, marginBottom: 20}}>
                {this.state.activeArea.numberOfSpots -
                  this.state.activeArea.availableSpots}
                /
                <TextComp bold style={{color: Colors.secondary}}>
                  {this.state.activeArea.numberOfSpots}
                </TextComp>
              </TextComp>
              <TouchableOpacity style={styles.btn}>
                <TextComp bold style={{color: 'white', fontSize: 16}}>
                  Reserve Spot
                </TextComp>
              </TouchableOpacity>
            </View>
          </Overlay>
          <View style={styles.screenTitleContainer}>
            <View style={{flex: 0.99, alignItems: 'center'}}>
              <TextComp style={{color: 'white', fontSize: 20}}>
                {parking.name}
              </TextComp>
            </View>
            <Ionicons
              name={this.state.isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={25}
              color="white"
              onPress={() => {
                this.setState({logVisible: !this.state.isBookmarked});
                setTimeout(() => {
                  this.setState({logVisible: false});
                }, 2000);
                this.setState({isBookmarked: !this.state.isBookmarked});
              }}
            />
          </View>
          <ScrollView>
            <View style={styles.body}>
              <TextComp style={styles.address}>{parking.address}</TextComp>
              <View style={styles.map}>
                <MapPreview selectedLocation={parking.coordinates} markers />
              </View>
              <TextComp style={{fontSize: 20, margin: 10}}>
                Pick Parking Area
              </TextComp>
              {parking.parkingAreas.map((area, index) => (
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
                      bold={area.availableSpots === 0}
                      style={{
                        color:
                          area.availableSpots === 0
                            ? Colors.primaryColor
                            : 'grey',
                      }}>
                      {area.numberOfSpots - area.availableSpots}/
                      {area.numberOfSpots}
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

export default ParkingAreaDetailScreen;

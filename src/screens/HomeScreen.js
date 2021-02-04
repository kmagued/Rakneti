import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  Image,
} from 'react-native';
import MapPreview from '../components/MapPreview';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import TextComp from '../components/TextComp';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class HomeScreen extends React.Component {
  state = {
    index: 0,
    coordinates: {lat: '30.019094695842536', lng: '31.499696268668135'},
    didReserve: false,
  };

  xOffset = new Animated.Value(0);

  transitionAnimation = (index) => {
    return {
      transform: [
        {perspective: 800},
        {
          scale: this.xOffset.interpolate({
            inputRange: [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH,
            ],
            outputRange: [1, 1, 1],
          }),
        },
      ],
    };
  };

  onViewableItemsChanged = ({viewableItems, changed}) => {
    this.setState({coordinates: viewableItems[0].item.coordinates});
  };

  renderPlace = (itemData) => (
    <Animated.View
      style={[styles.placeContainer, this.transitionAnimation(itemData.index)]}>
      {SCREEN_HEIGHT > 800 && (
        <View style={styles.image}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: itemData.item.image,
            }}
          />
        </View>
      )}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextComp style={{fontSize: 30, marginRight: 10}}>
          {itemData.item.name}
        </TextComp>
        <View
          style={{
            ...styles.circle,
            backgroundColor: itemData.item.isFull
              ? 'rgb(237, 113, 109)'
              : 'rgb(88, 192, 72)',
          }}
        />
      </View>
      <TextComp style={styles.addressText}>{itemData.item.address}</TextComp>
      {itemData.item.isFull ? (
        <View>
          <TextComp style={{fontSize: 18, textAlign: 'center'}}>
            No parking spots left!
          </TextComp>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            this.props.navigation.navigate('ParkingDetail', {
              parking: itemData.item,
            });
          }}>
          <TextComp bold style={{color: 'white', fontSize: 20}}>
            Reserve
          </TextComp>
        </TouchableOpacity>
      )}
    </Animated.View>
  );

  render() {
    const PLACES = [
      {
        name: 'AUC',
        address: 'AUC Avenue، Road، 11835',
        isFull: false,
        coordinates: {lat: '30.019094695842536', lng: '31.499696268668135'},
        parkingAreas: [
          {name: 'Bus gate', numberOfSpots: 50, availableSpots: 0},
          {name: 'Pepsi gate', numberOfSpots: 350, availableSpots: 4},
          {name: 'Watson', numberOfSpots: 300, availableSpots: 67},
          {name: 'Omar Mohsen', numberOfSpots: 80, availableSpots: 1},
          {name: 'Huss', numberOfSpots: 100, availableSpots: 11},
        ],
        image:
          'https://www.aucegypt.edu/sites/default/files/styles/banner/public/2020-03/auc.jpg?itok=ShA7CwbXhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.aucegypt.edu%2Fcampus-life%2Fservices%2Ftravel&psig=AOvVaw2H3_O9EomBePow3pToMFh5&ust=1611179910828000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMj-xYT_qO4CFQAAAAAdAAAAABAD',
      },
      {
        name: 'The Waterway',
        address: 'First New Cairo, Cairo Governorate',
        isFull: false,
        coordinates: {lat: '30.041966132098974', lng: '31.475415826443342'},
        parkingAreas: [
          {name: 'P1', numberOfSpots: 150, availableSpots: 23},
          {name: 'P2', numberOfSpots: 150, availableSpots: 42},
        ],
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB7Gy-IRmniZkSZn9TRw6ulJDxg3Z_40cLCA&usqp=CAU',
      },
      {
        name: 'City Stars',
        isFull: true,
        address: 'Citystars, Cairo Governorate 11771',
        coordinates: {lat: '30.07310549694943', lng: '31.345797468669588'},
        parkingAreas: [
          {name: '-3', numberOfSpots: 500, availableSpots: 412},
          {name: '-2', numberOfSpots: 650, availableSpots: 98},
          {name: '-1', numberOfSpots: 800, availableSpots: 39},
        ],
        image:
          'https://media-cdn.tripadvisor.com/media/photo-s/05/5c/94/63/city-stars-mall.jpg',
      },
      {
        name: 'Cairo Festival City',
        address:
          'Cairo Festival City Mall, Cairo Festival City, Ring Road, New Cairo، Cairo Governorate 11385',
        isFull: false,
        coordinates: {lat: '30.029884204216813', lng: '31.408410047290527'},
        parkingAreas: [
          {name: 'IKEA', numberOfSpots: 200, availableSpots: 5},
          {name: 'Cinema Entrance', numberOfSpots: 400, availableSpots: 118},
          {name: 'Marks & Spencer', numberOfSpots: 100, availableSpots: 22},
          {name: 'Fountain', numberOfSpots: 300, availableSpots: 21},
          {name: 'Bounce', numberOfSpots: 100, availableSpots: 2},
        ],
        image:
          'https://dm8puqpc36e80.cloudfront.net/uploads/production/stores/CFC%20Store.jpg',
      },
    ];

    return (
      <Fragment>
        <SafeAreaView
          style={{flex: 0, backgroundColor: Colors.primaryColor, zIndex: 1}}
        />
        <View style={styles.screen}>
          <Header
            centerComponent={
              <TextComp bold style={{color: 'white', fontSize: 25}}>
                RAKNETI
              </TextComp>
            }
            leftComponent={
              <Ionicons
                name="ios-menu"
                size={30}
                color="white"
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                }}
              />
            }
          />

          {/* RESERVE SPOT  */}
          {!this.state.didReserve && (
            <View style={styles.body}>
              <MapPreview
                style={{height: SCREEN_HEIGHT + 120, top: -30}}
                markers
                locations={PLACES}
                selectedLocation={this.state.coordinates}
              />
              <Animated.FlatList
                data={PLACES}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.name}
                renderItem={this.renderPlace}
                onViewableItemsChanged={this.onViewableItemsChanged}
                style={styles.list}
                viewabilityConfig={{
                  itemVisiblePercentThreshold: 45,
                }}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {x: this.xOffset}}}],
                  {useNativeDriver: true},
                )}
              />
            </View>
          )}

          {/* ALREADY RESERVED */}
          {this.state.didReserve && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{flex: 1, marginVertical: 20, marginHorizontal: 20}}>
              <View style={styles.map}>
                <MapPreview
                  selectedLocation={{
                    lat: '30.019094695842536',
                    lng: '31.499696268668135',
                  }}
                  markers
                />
              </View>
              <View>
                <TextComp black style={{fontSize: 24, marginBottom: 10}}>
                  Reservation Details
                </TextComp>
                <TextComp bold style={{fontSize: 16, marginBottom: 5}}>
                  Parking: <TextComp>AUC</TextComp>
                </TextComp>
                <TextComp bold style={{fontSize: 16, marginBottom: 5}}>
                  Area: <TextComp>Bus gate</TextComp>
                </TextComp>
                <TextComp bold style={{fontSize: 16, marginBottom: 40}}>
                  Reserved at: <TextComp>2:31 PM</TextComp>
                </TextComp>
                <TouchableOpacity
                  style={{...styles.btn, width: '100%', padding: 15}}>
                  <TextComp bold style={{color: 'white', fontSize: 16}}>
                    Cancel Reservation
                  </TextComp>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.primaryColor,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    height: 500,
    width: '100%',
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  text: {
    color: Colors.primaryColor,
    fontSize: 25,
    marginBottom: 10,
  },
  btn: {
    width: '60%',
    alignItems: 'center',
    padding: 12,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: Colors.primaryColor,
  },
  placeContainer: {
    padding: 15,
    height: '100%',
    width: SCREEN_WIDTH / 1.1,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  list: {
    position: 'absolute',
    height: SCREEN_HEIGHT > 800 ? 400 : 220,
    width: '95%',
    marginHorizontal: 10,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  image: {
    height: 170,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  addressText: {
    color: 'grey',
    marginBottom: 10,
    height: 35,
    fontSize: 13,
  },
});

export default HomeScreen;

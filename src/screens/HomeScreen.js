import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import TextComp from '../components/TextComp';
import {getLocations} from '../store/actions/locations';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SwipeList from 'react-native-swiper-flatlist';
import FeaturedLocation from '../components/FeaturedLocation';
import {ActivityIndicator} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HomeScreen extends React.Component {
  state = {
    featuredLocation: {},
  };

  renderPlace = (itemData) =>
    //Render 3 parking areas only
    itemData.index < 3 && (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('ParkingDetail', {
            parkingName: itemData.item.name,
          });
        }}
        style={styles.placeContainer}
        activeOpacity={0.9}
        disabled={itemData.item.isFull}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: itemData.item.image,
            }}
          />
        </View>
        <View style={{paddingHorizontal: 15, paddingBottom: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextComp
              bold
              style={{fontSize: 25, marginRight: 10, marginBottom: 2}}>
              {itemData.item.name}
            </TextComp>
          </View>
          <TextComp style={styles.addressText}>
            {itemData.item.address}
          </TextComp>
        </View>
      </TouchableOpacity>
    );

  componentDidMount() {
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
      <ScrollView style={styles.screen}>
        <FeaturedLocation location={this.state.featuredLocation} />
        {this.props.didReserve && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => this.props.navigation.navigate('Reservation')}
            style={{
              backgroundColor: Colors.primaryColor,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}>
            <TextComp
              bold
              style={{color: 'white', paddingVertical: 20, fontSize: 16}}>
              Reservation Details
            </TextComp>
            <View>
              <Ionicons name="ios-arrow-forward" size={25} color="white" />
            </View>
          </TouchableOpacity>
        )}
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '95%',
            }}>
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
              data={this.shuffle(this.props.locations)}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) =>
                `${item.coordinates.lat},${item.coordinates.lng}`
              }
              renderItem={this.renderPlace}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  placeContainer: {
    width: SCREEN_WIDTH / 1.1,
    backgroundColor: 'rgb(248, 249, 253)',
    borderRadius: 20,
    marginHorizontal: 8,
  },

  imageContainer: {
    height: 170,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addressText: {
    color: 'grey',
    height: 35,
    fontSize: 13,
  },
});

const mapStateToProps = (state) => ({
  locations: state.locations.locations,
  didReserve: state.users.didReserve,
});

const mapDispatchToProps = {
  get: getLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

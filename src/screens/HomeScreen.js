import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import TextComp from '../components/TextComp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {getLocations} from '../store/actions/locations';
import {connect} from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HomeScreen extends React.Component {
  state = {
    index: 0,
    coordinates: {
      latitude: 30.019094695842536,
      longitude: 31.499696268668135,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    location: null,
  };

  renderPlace = (itemData) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate('ParkingDetail', {
          parking: itemData.item,
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
          <TextComp style={{fontSize: 30, marginRight: 10}}>
            {itemData.item.name}
          </TextComp>
        </View>
        <TextComp style={styles.addressText}>{itemData.item.address}</TextComp>
      </View>
    </TouchableOpacity>
  );

  componentDidMount() {
    this.props.get();
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <Header
          centerComponent={
            <TextComp bold style={{color: Colors.primaryColor, fontSize: 25}}>
              RAKNETI
            </TextComp>
          }
          leftComponent={
            <Ionicons
              name="ios-menu"
              size={30}
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            />
          }
        />
        <View style={{marginHorizontal: 10, flex: 1}}>
          <FlatList
            data={this.props.locations}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={this.renderPlace}
          />
        </View>
      </SafeAreaView>
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
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 10,
    elevation: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    marginVertical: 7,
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
});

const mapDispatchToProps = {
  get: getLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

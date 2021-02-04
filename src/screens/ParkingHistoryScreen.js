import React, {Fragment} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import TextComp from '../components/TextComp';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';

class ParkingHistoryScreen extends React.Component {
  renderPlace = (itemData) => {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.map}>
            <MapPreview markers selectedLocation={itemData.item.coordinates} />
          </View>
          <View style={{marginHorizontal: 15, marginVertical: 5, width: '58%'}}>
            <TextComp style={{fontSize: 22}}>{itemData.item.name}</TextComp>
            <TextComp style={{color: 'grey', marginBottom: 10}}>
              {itemData.item.dateAdded}
            </TextComp>
            <TextComp style={{color: 'grey'}}>From: 12:45 PM</TextComp>
            <TextComp style={{color: 'grey'}}>To: 1:32 PM</TextComp>

            <View style={{marginTop: 25, alignSelf: 'flex-end'}}>
              <TouchableOpacity>
                <TextComp style={{color: Colors.primaryColor, fontSize: 12}}>
                  Remove from History
                </TextComp>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const PLACES = [
      {
        name: 'Point 90',
        isFull: false,
        coordinates: {lat: '30.020562315816996', lng: '31.495029894659176'},
        dateAdded: 'Jan 12, 2021',
      },
      {
        name: 'City Stars',
        isFull: false,
        coordinates: {lat: '30.07310549694943', lng: '31.345797468669588'},
        dateAdded: 'Aug 13, 2020',
      },
      {
        name: 'Cairo Festival City',
        isFull: true,
        coordinates: {lat: '30.029884204216813', lng: '31.408410047290527'},
        dateAdded: 'Jul 29, 2020',
      },
    ];

    return (
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: Colors.primaryColor}} />
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
          <View style={styles.screenTitleContainer}>
            <TextComp style={{color: 'white', fontSize: 20}}>
              Parking History
            </TextComp>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={PLACES}
            keyExtractor={(item) => item.name}
            renderItem={this.renderPlace}
          />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenTitleContainer: {
    backgroundColor: Colors.secondary,
    padding: 15,
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    height: 150,
    width: '90%',
    marginVertical: 8,
    alignSelf: 'center',
    borderRadius: 15,
    padding: 10,
  },
  map: {
    borderWidth: 0.5,
    borderColor: 'grey',
    width: '36%',
    borderRadius: 15,
    overflow: 'hidden',
  },
});

export default ParkingHistoryScreen;
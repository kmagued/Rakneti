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
import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';
import {connect} from 'react-redux';
import {removeFromBookmarkedLocations} from '../store/actions/locations';

class BookmarkedLocationsScreen extends React.Component {
  renderPlace = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.navigation.navigate('ParkingDetail', {
            parkingName: itemData.item.name,
          });
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.map}>
            <MapPreview selectedLocation={itemData.item.coordinates} markers />
          </View>
          <View style={{marginHorizontal: 15, marginVertical: 5, width: '58%'}}>
            <TextComp style={{fontSize: 22, marginBottom: 20}}>
              {itemData.item.name}
            </TextComp>
            <TextComp style={{color: 'grey', marginBottom: 5}}>
              Added on{'\n'}
              {itemData.item.dateAdded}
            </TextComp>

            <View style={{marginTop: 25, alignSelf: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.remove(this.props.user.uid, itemData.item);
                }}>
                <TextComp style={{color: Colors.primaryColor, fontSize: 12}}>
                  Remove from Bookmarks
                </TextComp>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.screenTitleContainer}>
          <TextComp bold style={{color: Colors.secondary, fontSize: 20}}>
            Bookmarked Locations
          </TextComp>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Object.values(this.props.user.bookmarkedLocations)}
          keyExtractor={(item) => item.name}
          renderItem={this.renderPlace}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  screenTitleContainer: {
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  map: {
    borderWidth: 0.5,
    borderColor: 'grey',
    width: '36%',
    borderRadius: 15,
    overflow: 'hidden',
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {
  remove: removeFromBookmarkedLocations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookmarkedLocationsScreen);

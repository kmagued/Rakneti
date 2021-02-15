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
import {connect} from 'react-redux';
import {removeFromBookmarkedLocations} from '../store/actions/locations';

class BookmarkedLocationsScreen extends React.Component {
  renderPlace = (itemData) => {
    return (
      <View style={styles.container}>
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
      </View>
    );
  };

  render() {
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
              Bookmarked Locations
            </TextComp>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Object.values(this.props.user.bookmarkedLocations)}
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

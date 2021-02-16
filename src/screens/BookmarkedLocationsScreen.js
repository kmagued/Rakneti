import React, {Fragment} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import TextComp from '../components/TextComp';
import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';
import {connect} from 'react-redux';
import {removeFromBookmarkedLocations} from '../store/actions/locations';
import Ionicons from 'react-native-vector-icons/Ionicons';

class BookmarkedLocationsScreen extends React.Component {
  renderPlace = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.navigation.navigate('ParkingDetail', {
            parkingName: itemData.item.name,
          });
        }}
        activeOpacity={0.7}>
        <ImageBackground
          source={{uri: itemData.item.image}}
          style={{width: '100%', height: '100%', justifyContent: 'flex-end'}}>
          <View style={styles.titleContainer}>
            <View style={{width: '80%'}}>
              <TextComp black style={{fontSize: 22, color: 'white'}}>
                {itemData.item.name.toUpperCase()}
              </TextComp>
              <TextComp bold style={{color: 'white', fontSize: 14}}>
                ADDED ON {itemData.item.dateAdded.toUpperCase()}
              </TextComp>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.props.remove(this.props.user.uid, itemData.item);
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                activeOpacity={0.7}>
                <Ionicons name="ios-bookmark-outline" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.headerContainer}>
          <TextComp black style={{color: Colors.secondary, fontSize: 18}}>
            BOOKMARKED LOCATIONS
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
  headerContainer: {
    padding: 15,
    alignItems: 'center',
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: 'white',
    height: 200,
    width: '90%',
    marginVertical: 8,
    alignSelf: 'center',
    borderRadius: 15,
    overflow: 'hidden',
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

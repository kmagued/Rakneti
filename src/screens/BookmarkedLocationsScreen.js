import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import TextComp from '../components/TextComp';
import Colors from '../constants/Colors';
import {connect} from 'react-redux';
import {removeFromBookmarkedLocations} from '../store/actions/locations';
import Location from '../components/Location';

class BookmarkedLocationsScreen extends React.Component {
  renderPlace = (itemData) => {
    return (
      <Location
        favorites
        place={itemData.item}
        onPress={() => {
          this.props.navigation.navigate('ParkingDetail', {
            parkingName: itemData.item.name,
          });
        }}
        onRemove={() => {
          this.props.remove(this.props.user.uid, itemData.item);
        }}
      />
    );
  };

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{backgroundColor: Colors.secondary}} />
        <SafeAreaView style={styles.screen}>
          <View style={styles.headerContainer}>
            <TextComp style={{color: 'white', fontSize: 20}}>
              Favorites
            </TextComp>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Object.values(this.props.user.bookmarkedLocations)}
            keyExtractor={(item) => item.name}
            renderItem={this.renderPlace}
          />
        </SafeAreaView>
      </>
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
    backgroundColor: Colors.secondary,
    marginBottom: 10,
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

import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import TextComp from '../components/TextComp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import {connect} from 'react-redux';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

class SearchScreen extends React.Component {
  state = {
    borderColor: Colors.secondary,
    borderWidth: 0.5,
    searchInput: '',
    filteredLocations: [],
  };

  search = () => {
    const filteredLocations = this.props.locations.filter((location) => {
      const name = String.prototype.toUpperCase.call(location.name);

      const search = String.prototype.toUpperCase.call(this.state.searchInput);
      return name.indexOf(search) > -1;
    });

    this.setState({filteredLocations});
  };

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <FocusAwareStatusBar barStyle="dark-content" />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <View
            style={{
              ...styles.inputContainer,
              borderColor: this.state.borderColor,
              borderWidth: this.state.borderWidth,
            }}>
            <Ionicons name="ios-search" color="grey" size={20} />
            <TextInput
              autoFocus
              placeholder="Parking name, area..."
              value={this.state.searchInput}
              style={styles.input}
              onChangeText={(input) => {
                this.setState({searchInput: input});
                this.search();
              }}
              onFocus={() => {
                this.setState({
                  borderColor: Colors.primaryColor,
                  borderWidth: 3,
                });
              }}
              onBlur={() => {
                this.setState({
                  borderColor: Colors.secondary,
                  borderWidth: 0.5,
                });
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <TextComp style={{fontSize: 18, color: Colors.secondary}}>
              Cancel
            </TextComp>
          </TouchableOpacity>
        </View>
        {this.state.searchInput !== '' && this.state.filteredLocations && (
          <TextComp
            style={{
              fontSize: 18,
              color: Colors.secondary,
              marginHorizontal: 30,
              marginVertical: 10,
            }}>
            Locations
          </TextComp>
        )}
        <FlatList
          data={this.state.filteredLocations}
          keyExtractor={(item) => item.name}
          renderItem={(itemData) => (
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                this.props.navigation.navigate('ParkingDetail', {
                  parkingName: itemData.item.name,
                });
              }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  overflow: 'hidden',
                  marginRight: 10,
                }}>
                <Image
                  source={{uri: itemData.item.image}}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <TextComp>{itemData.item.name}</TextComp>
            </TouchableOpacity>
          )}
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
  container: {
    marginHorizontal: 20,
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
  },
  inputContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontFamily: 'Ubuntu-Regular',
    width: '70%',
    marginLeft: 10,
    paddingVertical: 13,
  },
});

const mapStateToProps = (state) => ({
  locations: state.locations.locations,
});

export default connect(mapStateToProps)(SearchScreen);

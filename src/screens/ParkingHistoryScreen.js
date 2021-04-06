import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import TextComp from '../components/TextComp';
import Colors from '../constants/Colors';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import {connect} from 'react-redux';

class ParkingHistoryScreen extends React.Component {
  renderPlace = (itemData) => {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.photo}>
            <Image
              source={{uri: itemData.item.image}}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View style={{marginHorizontal: 15, marginVertical: 5, width: '58%'}}>
            <TextComp style={{fontSize: 22}}>{itemData.item.name}</TextComp>
            <TextComp style={{color: 'grey', marginBottom: 10}}>
              {itemData.item.date}
            </TextComp>
            <TextComp style={{color: 'grey'}}>From: 12:45 PM</TextComp>
            <TextComp style={{color: 'grey'}}>To: 1:32 PM</TextComp>

            <View style={{marginTop: 25, alignSelf: 'flex-end'}}>
              <TouchableOpacity>
                <TextComp style={{color: Colors.secondary, fontSize: 12}}>
                  Remove from History
                </TextComp>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome5 name="history" size={80} color="rgba(52,212,132,0.4)" />
      <TextComp
        style={{
          fontSize: 18,
          alignSelf: 'center',
          color: Colors.secondary,
          marginTop: 15,
        }}>
        Your parking history will appear here
      </TextComp>
    </View>
  );

  render() {
    return (
      <>
        <FocusAwareStatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.screen}>
          <Header
            centerComponent={
              <TextComp bold style={{color: Colors.secondary, fontSize: 20}}>
                Parking History
              </TextComp>
            }
            leftComponent={
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Ionicons
                  name="ios-arrow-back"
                  size={25}
                  color={Colors.secondary}
                />
              </TouchableOpacity>
            }
          />
          <FlatList
            contentContainerStyle={{
              flex: this.props.user.history.length ? null : 1,
            }}
            ListEmptyComponent={this.renderEmpty}
            showsVerticalScrollIndicator={false}
            data={Object.values(this.props.user.history)}
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
    marginBottom: 10,
  },
  container: {
    backgroundColor: 'whitesmoke',
    height: 150,
    width: '90%',
    marginVertical: 8,
    alignSelf: 'center',
    borderRadius: 15,
    padding: 10,
  },
  photo: {
    width: '36%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

export default connect(mapStateToProps)(ParkingHistoryScreen);

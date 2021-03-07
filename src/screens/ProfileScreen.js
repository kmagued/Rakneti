import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';

//Components & Constants
import Header from '../components/Header';
import TextComp from '../components/TextComp';
import Colors from '../constants/Colors';
import CarDetails from '../components/CarDetails';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

//Redux
import {connect} from 'react-redux';
import {logout} from '../store/actions/users';

//Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class ProfileScreen extends React.Component {
  renderHistory = (itemData) =>
    itemData.index < 2 && (
      <TouchableOpacity
        style={styles.placeContainer}
        activeOpacity={0.8}
        onPress={() =>
          this.props.navigation.navigate('HistoryDetail', {
            itemDetail: itemData.item,
          })
        }>
        <View style={styles.photo}>
          <Image
            source={{
              uri: itemData.item.image,
            }}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View
          style={{
            backgroundColor: 'whitesmoke',
            padding: 10,
          }}>
          <TextComp
            bold
            numberOfLines={1}
            style={{fontSize: 16}}
            ellipsizeMode="tail">
            {itemData.item.name}
          </TextComp>
          <TextComp>{itemData.item.date}</TextComp>
        </View>
      </TouchableOpacity>
    );

  renderEmpty = () => (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: 30,
        borderRadius: 15,
      }}>
      <>
        <FontAwesome5 name="history" size={70} color={Colors.primaryColor} />
        <View
          style={{
            ...styles.slash,
            borderColor: 'white',
            marginTop: 52,
            borderWidth: 3,
            width: 100,
          }}
        />
        <View
          style={{
            ...styles.slash,
            borderColor: Colors.primaryColor,
            marginTop: 60,
          }}
        />
        <View
          style={{
            ...styles.slash,
            borderColor: 'white',
            marginTop: 68,
            borderWidth: 3,
            width: 100,
          }}
        />
      </>
      <TextComp style={{fontSize: 16, marginTop: 10}}>
        Your parking history will appear here
      </TextComp>
    </View>
  );

  render() {
    return (
      <>
        <SafeAreaView style={styles.screen}>
          <FocusAwareStatusBar barStyle="dark-content" />
          <ScrollView>
            <Header
              rightComponent={
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('Logout', 'Are you sure you want to logout?', [
                      {text: 'Cancel', style: 'cancel'},
                      {
                        text: 'Log Out',
                        style: 'destructive',
                        onPress: () => {
                          this.props.logout();
                        },
                      },
                    ]);
                  }}>
                  <MaterialIcons
                    name="logout"
                    size={23}
                    color={Colors.secondary}
                  />
                </TouchableOpacity>
              }
            />
            <View style={styles.container}>
              <View style={{alignItems: 'center'}}>
                <View style={styles.circle}>
                  <TextComp style={{fontSize: 50, color: 'white'}}>
                    {this.props.user.fullName.charAt(0).toUpperCase()}
                  </TextComp>
                </View>
                <TextComp black style={{fontSize: 35, color: Colors.secondary}}>
                  {this.props.user.fullName}
                </TextComp>
                <TextComp
                  style={{color: Colors.secondary, fontSize: 16, marginTop: 3}}>
                  {this.props.user.email}
                </TextComp>
              </View>
            </View>
            <View style={{paddingHorizontal: 30}}>
              <CarDetails
                car={this.props.user.cars.find((car) => car.active)}
              />
            </View>
            <View style={styles.container}></View>
          </ScrollView>
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
  screenTitleContainer: {
    padding: 15,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 7,
  },
  placeContainer: {
    width: 170,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  photo: {
    height: 120,
  },
  slash: {
    width: 85,
    borderWidth: 5,
    transform: [{rotate: '-45deg'}],
    position: 'absolute',
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

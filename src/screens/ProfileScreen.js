import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import TextComp from '../components/TextComp';
import Colors from '../constants/Colors';
import {connect} from 'react-redux';
import Header from '../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {logout} from '../store/actions/users';

class ProfileScreen extends React.Component {
  render() {
    return (
      <>
        <SafeAreaView style={{backgroundColor: Colors.secondary}} />
        <SafeAreaView style={styles.screen}>
          <Header
            style={{backgroundColor: Colors.secondary, paddingBottom: 10}}
            centerComponent={
              <TextComp style={{color: 'white', fontSize: 20}}>
                Profile
              </TextComp>
            }
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
                <MaterialIcons name="logout" size={25} color="white" />
              </TouchableOpacity>
            }
          />
          <ScrollView scrollEnabled={Dimensions.get('window').height < 800}>
            <View style={styles.infoContainer}>
              <View style={styles.circle}>
                <TextComp style={{color: Colors.secondary, fontSize: 60}}>
                  {this.props.user.fullName.charAt(0)}
                </TextComp>
              </View>
              <TextComp style={{fontSize: 28, color: 'white'}}>
                {this.props.user.fullName}
              </TextComp>
              <TextComp style={{color: 'white', fontSize: 16, marginTop: 5}}>
                {this.props.user.email}
              </TextComp>
            </View>
            <View style={styles.body}>
              <TouchableOpacity
                style={styles.container}
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate('EditProfile');
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                      backgroundColor: 'white',
                    }}>
                    <MaterialIcons
                      name="edit"
                      size={30}
                      color={Colors.primaryColor}
                    />
                  </View>
                  <TextComp
                    bold
                    style={{
                      color: Colors.secondary,
                      fontSize: 18,
                      marginLeft: 20,
                    }}>
                    Edit Profile
                  </TextComp>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('EditProfile');
                  }}>
                  <Ionicons
                    name="ios-chevron-forward"
                    size={30}
                    color={Colors.primaryColor}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate('Report');
                }}
                style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                      backgroundColor: 'white',
                    }}>
                    <MaterialIcons
                      name="report-problem"
                      size={30}
                      color={Colors.primaryColor}
                    />
                  </View>
                  <TextComp
                    bold
                    style={{
                      color: Colors.secondary,
                      fontSize: 18,
                      marginLeft: 20,
                    }}>
                    Report
                  </TextComp>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Report');
                  }}>
                  <Ionicons
                    name="ios-chevron-forward"
                    size={30}
                    color={Colors.primaryColor}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.container}
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate('ContactUs');
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                      backgroundColor: 'white',
                    }}>
                    <MaterialIcons
                      name="phone-in-talk"
                      size={30}
                      color={Colors.primaryColor}
                    />
                  </View>
                  <TextComp
                    bold
                    style={{
                      color: Colors.secondary,
                      fontSize: 18,
                      marginLeft: 20,
                    }}>
                    Contact Us
                  </TextComp>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('ContactUs');
                  }}>
                  <Ionicons
                    name="ios-chevron-forward"
                    size={30}
                    color={Colors.primaryColor}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgb(248, 249, 253)',
  },
  screenTitleContainer: {
    padding: 15,
    alignItems: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderBottomRightRadius: Platform.OS === 'ios' ? 20 : 0,
    borderBottomLeftRadius: Platform.OS === 'ios' ? 20 : 0,
    height: '45%',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 5,
    fontSize: 14,
    color: Colors.secondary,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  circle: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 60,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    width: '80%',
    alignSelf: 'center',
    paddingBottom: 150,
    marginVertical: 20,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

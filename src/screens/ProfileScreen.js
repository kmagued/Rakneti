import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';

//Components & Constants
import Header from '../components/Header';
import TextComp from '../components/TextComp';
import Colors from '../constants/Colors';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import CarChoice from '../screens/CarChoice';
import {Overlay} from 'react-native-elements';

//Redux
import {connect} from 'react-redux';
import {logout} from '../store/actions/users';

//Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import CarDetails from '../components/CarDetails';
class ProfileScreen extends React.Component {
  state = {
    visible: false,
  };

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
        <FocusAwareStatusBar barStyle="light-content" />

        <Overlay
          isVisible={this.state.visible}
          animationType="slide"
          overlayStyle={{height: '100%', width: '100%'}}>
          <CarChoice
            onClose={() => {
              this.setState({visible: false});
            }}
          />
        </Overlay>
        <ScrollView style={styles.screen} bounces={false}>
          <View style={{height: Dimensions.get('window').height / 2.5}}>
            <ImageBackground
              style={{height: '100%', width: '100%'}}
              source={{
                uri:
                  'https://c0.wallpaperflare.com/preview/300/236/845/sunset-sun-gradient-red.jpg',
              }}>
              <SafeAreaView
                style={{backgroundColor: 'rgba(0,0,0,0.3)', height: '100%'}}>
                <Header
                  rightComponent={
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          'Logout',
                          'Are you sure you want to logout?',
                          [
                            {text: 'Cancel', style: 'cancel'},
                            {
                              text: 'Log Out',
                              style: 'destructive',
                              onPress: () => {
                                this.props.logout();
                              },
                            },
                          ],
                        );
                      }}>
                      <MaterialIcons name="logout" size={23} color="white" />
                    </TouchableOpacity>
                  }
                />
                <View style={{marginBottom: 20}}>
                  <View style={{alignItems: 'center'}}>
                    <View style={styles.circle}>
                      <TextComp style={{fontSize: 50, color: '#b6b6b6'}}>
                        {this.props.user.fullName.charAt(0).toUpperCase()}
                      </TextComp>
                    </View>
                    <TextComp black style={{fontSize: 30, color: 'white'}}>
                      {this.props.user.fullName}
                    </TextComp>
                    <TextComp
                      style={{
                        color: 'white',
                        fontSize: 15,
                        marginTop: 3,
                      }}>
                      {this.props.user.email}
                    </TextComp>
                  </View>
                </View>
              </SafeAreaView>
            </ImageBackground>
          </View>
          <>
            <View
              style={{
                ...styles.box,
                marginTop: -30,
                marginBottom: 20,
              }}>
              <TouchableOpacity
                style={{...styles.btn, paddingVertical: 0}}
                activeOpacity={0.7}
                onPress={() => this.setState({visible: true})}>
                <CarDetails
                  profile
                  car={this.props.user.cars.find((car) => car.active)}
                  onChoose={() => this.setState({visible: true})}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                ...styles.box,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              }}>
              <TouchableOpacity
                style={{
                  ...styles.row,
                  ...styles.btn,
                }}
                activeOpacity={0.7}>
                <View style={styles.row}>
                  <MaterialIcons
                    name="notifications"
                    size={25}
                    color="#b6b6b6"
                  />
                  <TextComp style={styles.text}>Notifications</TextComp>
                </View>
                <Entypo name="chevron-small-right" size={25} color="#b6b6b6" />
              </TouchableOpacity>
              <View style={styles.line} />
            </View>
            <View
              style={{
                ...styles.box,
                borderRadius: 0,
              }}>
              <TouchableOpacity
                style={{
                  ...styles.row,
                  ...styles.btn,
                }}
                activeOpacity={0.7}
                onPress={() => this.props.navigation.navigate('History')}>
                <View style={styles.row}>
                  <MaterialIcons name="history" size={25} color="#b6b6b6" />
                  <TextComp style={styles.text}>Parking History</TextComp>
                </View>
                <Entypo name="chevron-small-right" size={25} color="#b6b6b6" />
              </TouchableOpacity>
              <View style={styles.line} />
            </View>
            <View
              style={{
                ...styles.box,
                borderRadius: 0,
              }}>
              <TouchableOpacity
                style={{
                  ...styles.row,
                  ...styles.btn,
                }}
                activeOpacity={0.7}
                onPress={() => this.props.navigation.navigate('Report')}>
                <View style={styles.row}>
                  <MaterialIcons
                    name="report-problem"
                    size={25}
                    color="#b6b6b6"
                  />
                  <TextComp style={styles.text}>Report</TextComp>
                </View>
                <Entypo name="chevron-small-right" size={25} color="#b6b6b6" />
              </TouchableOpacity>
              <View style={styles.line} />
            </View>
            <View
              style={{
                ...styles.box,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                marginBottom: 20,
              }}>
              <TouchableOpacity
                style={{
                  ...styles.row,
                  ...styles.btn,
                }}
                activeOpacity={0.7}>
                <View style={styles.row}>
                  <Feather name="help-circle" size={25} color="#b6b6b6" />
                  <TextComp style={styles.text}>Help</TextComp>
                </View>
                <Entypo name="chevron-small-right" size={25} color="#b6b6b6" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                ...styles.box,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              }}>
              <TouchableOpacity
                style={{
                  ...styles.row,
                  ...styles.btn,
                }}
                activeOpacity={0.7}>
                <View style={styles.row}>
                  <MaterialIcons name="lock" size={25} color="#b6b6b6" />
                  <TextComp style={styles.text}>Privacy Policy</TextComp>
                </View>
                <Entypo name="chevron-small-right" size={25} color="#b6b6b6" />
              </TouchableOpacity>
              <View style={styles.line} />
            </View>
            <View
              style={{
                ...styles.box,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                marginBottom: 20,
              }}>
              <TouchableOpacity
                style={{
                  ...styles.row,
                  ...styles.btn,
                }}
                activeOpacity={0.7}>
                <View style={styles.row}>
                  <Feather name="file-text" size={25} color="#b6b6b6" />
                  <TextComp style={styles.text}>Terms of Service</TextComp>
                </View>
                <Entypo name="chevron-small-right" size={25} color="#b6b6b6" />
              </TouchableOpacity>
            </View>
          </>
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <TextComp style={{color: '#b6b7b7'}}>Rakneti v1.0.0</TextComp>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenTitleContainer: {
    padding: 15,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    padding: 10,
    marginLeft: 10,
    color: Colors.secondary,
  },
  btn: {
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  box: {
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: '#e6e6e6',
    width: '87%',
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

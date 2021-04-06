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
import Box from '../components/Box';

//Redux
import {connect} from 'react-redux';
import {logout} from '../store/actions/users';

//Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CarDetails from '../components/CarDetails';
class ProfileScreen extends React.Component {
  state = {
    visible: false,
  };

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
                uri: 'https://wallpapercave.com/wp/wp4465062.jpg',
              }}>
              <SafeAreaView
                style={{backgroundColor: 'rgba(0,0,0,0.1)', height: '100%'}}>
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
                      <TextComp style={{fontSize: 50, color: 'grey'}}>
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
            <TouchableOpacity
              style={{
                ...styles.box,
                marginTop: Dimensions.get('window').height < 800 ? -30 : -40,
                marginBottom: 20,
              }}
              activeOpacity={0.7}
              onPress={() => this.setState({visible: true})}>
              <View style={{...styles.btn, paddingVertical: 0}}>
                <CarDetails
                  profile
                  car={this.props.user.cars.find((car) => car.active)}
                  onChoose={() => this.setState({visible: true})}
                />
              </View>
            </TouchableOpacity>
            <Box
              top
              iconName="history"
              iconType="material-icons"
              title="Parking History"
              onPress={() => this.props.navigation.navigate('History')}
            />
            <Box
              end
              iconName="report-problem"
              iconType="material-icons"
              title="Report"
              onPress={() => this.props.navigation.navigate('Report')}
            />

            <Box
              top
              iconName="lock"
              iconType="material-icons"
              title="Privacy Policy"
              onPress={() => {}}
            />
            <Box
              mid
              iconName="file-text"
              iconType="feather"
              title="Terms of Service"
              onPress={() => {}}
            />
            <Box
              end
              iconName="help-circle"
              iconType="feather"
              title="Help"
              onPress={() => {}}
            />
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
    width: '85%',
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

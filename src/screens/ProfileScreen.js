import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import TextComp from '../components/TextComp';
import Colors from '../constants/Colors';
import {connect} from 'react-redux';
import Header from '../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {logout} from '../store/actions/users';

class ProfileScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.screen}>
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
              <MaterialIcons name="logout" size={25} />
            </TouchableOpacity>
          }
        />
        <View style={{marginBottom: 20, alignItems: 'center'}}>
          <View style={styles.circle}>
            <TextComp style={{color: 'white', fontSize: 50}}>
              {this.props.user.fullName.charAt(0)}
            </TextComp>
          </View>
          <TextComp style={{fontSize: 30}}>{this.props.user.fullName}</TextComp>
          <TouchableOpacity>
            <TextComp style={{color: '#333333', fontSize: 16}}>
              Edit profile
            </TextComp>
          </TouchableOpacity>
        </View>
        <View style={{width: '80%', alignSelf: 'center'}}>
          <View
            style={{
              borderBottomWidth: 0.5,
              marginVertical: 20,
              paddingVertical: 5,
            }}>
            <TextComp black style={{fontSize: 18, color: Colors.primaryColor}}>
              USER INFO
            </TextComp>
          </View>
          <View>
            <TextComp bold style={styles.title}>
              EMAIL
            </TextComp>
            <TextComp style={styles.text}>{this.props.user.email}</TextComp>
            <TextComp bold style={styles.title}>
              MOBILE
            </TextComp>
            <TextComp style={styles.text}>{this.props.user.mobile}</TextComp>
          </View>
          <View
            style={{
              borderBottomWidth: 0.5,
              marginVertical: 20,
              paddingVertical: 5,
            }}>
            <TextComp black style={{fontSize: 18, color: Colors.primaryColor}}>
              CAR DETAILS
            </TextComp>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: '60%'}}>
              <TextComp bold style={styles.title}>
                MAKE
              </TextComp>
              <TextComp style={styles.text}>
                {this.props.user.carDetails.make}
              </TextComp>
              <TextComp bold style={styles.title}>
                MODEL
              </TextComp>
              <TextComp style={styles.text}>
                {this.props.user.carDetails.model}
              </TextComp>
            </View>
            <View>
              <TextComp bold style={styles.title}>
                COLOR
              </TextComp>
              <TextComp style={styles.text}>
                {this.props.user.carDetails.color}
              </TextComp>
              <TextComp bold style={styles.title}>
                PLATE NUMBER
              </TextComp>
              <TextComp style={styles.text}>
                {this.props.user.carDetails.licensePlate}
              </TextComp>
            </View>
          </View>
        </View>
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
  title: {
    marginBottom: 5,
    fontSize: 14,
    color: Colors.secondary,
  },
  text: {
    marginBottom: 15,
  },
  circle: {
    width: 100,
    height: 100,
    backgroundColor: '#333333',
    borderRadius: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

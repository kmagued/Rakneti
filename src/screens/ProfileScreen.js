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
            style={{backgroundColor: Colors.secondary}}
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
                <MaterialIcons name="logout" size={23} color="white" />
              </TouchableOpacity>
            }
          />
          <ScrollView
            scrollEnabled={Dimensions.get('window').height < 800}
            contentContainerStyle={{height: '100%'}}>
            <View style={styles.infoContainer}>
              <View style={styles.circle}>
                <TextComp style={{color: Colors.secondary, fontSize: 50}}>
                  {this.props.user.fullName.charAt(0)}
                </TextComp>
              </View>
              <TextComp style={{fontSize: 28, color: Colors.secondary}}>
                {this.props.user.fullName}
              </TextComp>
              <TextComp
                style={{color: Colors.secondary, fontSize: 16, marginTop: 5}}>
                {this.props.user.email}
              </TextComp>
            </View>
            <View style={styles.body}></View>
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
  infoContainer: {
    alignItems: 'center',
    borderBottomRightRadius: Platform.OS === 'ios' ? 10 : 0,
    borderBottomLeftRadius: Platform.OS === 'ios' ? 10 : 0,
    justifyContent: 'center',
    height: '30%',
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
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 50,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    alignSelf: 'center',
    paddingBottom: 150,
    marginVertical: 20,
    height: '65%',
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

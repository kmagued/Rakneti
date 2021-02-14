import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import ParkingHistoryScreen from '../screens/ParkingHistoryScreen';
import BookmarkedLocationsScreen from '../screens/BookmarkedLocationsScreen';
import ReportScreen from '../screens/ReportScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import ParkingAreaDetailScreen from '../screens/ParkingAreaDetailScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import TextComp from '../components/TextComp';
import {useSelector} from 'react-redux';

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator headerMode="none">
      <AuthStackNavigator.Screen name="Login" component={LoginScreen} />
      <AuthStackNavigator.Screen name="Signup" component={SignupScreen} />
      <AuthStackNavigator.Screen
        name="CarDetails"
        component={CarDetailsScreen}
      />
    </AuthStackNavigator.Navigator>
  );
};

const HomeStackNavigator = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator headerMode="none">
      <HomeStackNavigator.Screen name="Home" component={HomeScreen} />

      <HomeStackNavigator.Screen
        name="ParkingDetail"
        component={ParkingAreaDetailScreen}
      />
    </HomeStackNavigator.Navigator>
  );
};

const DrawerNavigator = createDrawerNavigator();

export const Drawer = (props) => {
  const {email, fullName} = useSelector((state) => state.users.user);

  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={styles.drawer}>
            <SafeAreaView
              style={{flex: 1}}
              forceInset={{top: 'always', horizontal: 'never'}}>
              <View
                style={{
                  flex: 0.9,
                  marginTop: Platform.OS === 'android' ? 0 : 20,
                }}>
                <View style={styles.container}>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Ionicons name="ios-person-circle" size={80} color="#ccc" />
                    <View>
                      <TextComp style={{fontSize: 16}}>{fullName}</TextComp>
                      <TextComp style={{color: 'grey', fontSize: 12}}>
                        {email}
                      </TextComp>
                    </View>
                  </View>
                  <TouchableOpacity style={{alignItems: 'flex-end'}}>
                    <TextComp
                      style={{fontSize: 12, color: Colors.primaryColor}}>
                      Edit profile
                    </TextComp>
                  </TouchableOpacity>
                </View>
                <DrawerItemList {...props} />
              </View>
              <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={() => {}}>
                  <MaterialIcons name="settings" size={35} color="white" />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeBackgroundColor: null,
        activeTintColor: Colors.secondary,
        inactiveTintColor: 'white',
        labelStyle: {
          fontFamily: 'Ubuntu-Regular',
        },
      }}>
      <DrawerNavigator.Screen
        name="Reserve"
        component={HomeNavigator}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="home-outline"
              size={28}
              color="white"
            />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="Parking History"
        component={ParkingHistoryScreen}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name="history" size={25} color="white" />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="Bookmarked Locations"
        component={BookmarkedLocationsScreen}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="bookmark-outline"
              size={25}
              color="white"
            />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="Report"
        component={ReportScreen}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="report-problem" size={25} color="white" />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="phone-in-talk" size={25} color="white" />
          ),
        }}
      />
    </DrawerNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.primaryColor,
  },
  container: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  bottomContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
});

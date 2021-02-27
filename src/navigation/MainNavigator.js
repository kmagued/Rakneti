import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import ParkingHistoryScreen from '../screens/ParkingHistoryScreen';
import BookmarkedLocationsScreen from '../screens/BookmarkedLocationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import ParkingAreaDetailScreen from '../screens/ParkingAreaDetailScreen';
import ReservationDetails from '../screens/ReservationDetails';
import ParkingAreas from '../screens/ParkingAreas';
import AddLocation from '../screens/AddLocation';
import EditProfileScreen from '../screens/EditProfileScreen';
import ReportScreen from '../screens/ReportScreen';
import MapScreen from '../screens/MapScreen';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Colors from '../constants/Colors';
import {useSelector} from 'react-redux';
import SearchScreen from '../screens/SearchScreen';

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
      <HomeStackNavigator.Screen name="Search" component={SearchScreen} />
      <HomeStackNavigator.Screen
        name="Reservation"
        component={ReservationDetails}
      />
      <HomeStackNavigator.Screen name="ParkingAreas" component={ParkingAreas} />
      <HomeStackNavigator.Screen name="Map" component={MapScreen} />
    </HomeStackNavigator.Navigator>
  );
};

const BookmarkedStackNavigator = createStackNavigator();

export const BookmarkedNavigator = () => (
  <BookmarkedStackNavigator.Navigator headerMode="none">
    <BookmarkedStackNavigator.Screen
      name="BookmarkedLocations"
      component={BookmarkedLocationsScreen}
    />

    <BookmarkedStackNavigator.Screen
      name="ParkingDetail"
      component={ParkingAreaDetailScreen}
    />
  </BookmarkedStackNavigator.Navigator>
);

const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => (
  <ProfileStackNavigator.Navigator headerMode="none">
    <ProfileStackNavigator.Screen name="Profile" component={ProfileScreen} />
    <ProfileStackNavigator.Screen
      name="ContactUs"
      component={ContactUsScreen}
    />
    <ProfileStackNavigator.Screen
      name="EditProfile"
      component={EditProfileScreen}
    />
    <ProfileStackNavigator.Screen name="Report" component={ReportScreen} />
    <ProfileStackNavigator.Screen
      name="History"
      component={ParkingHistoryScreen}
    />
  </ProfileStackNavigator.Navigator>
);

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const user = useSelector((state) => state.users.user);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'HomeNav') {
            return focused ? (
              <Foundation name="home" size={30} color={color} />
            ) : (
              <Feather name="home" size={25} color={color} />
            );
          } else if (route.name === 'Bookmarks') {
            return focused ? (
              <FontAwesome name="heart" size={24} color={color} />
            ) : (
              <Feather name="heart" size={25} color={color} />
            );
          } else if (route.name === 'Add') {
            return (
              <MaterialIcons name="add-business" size={size} color={color} />
            );
          } else {
            return (
              <FontAwesome5
                name={focused ? 'user-alt' : 'user'}
                size={size}
                color={color}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: Colors.secondary,
        showLabel: false,
        labelStyle: {
          fontFamily: 'Ubuntu-Regular',
        },
      }}>
      <Tab.Screen name="HomeNav" component={HomeNavigator} />
      <Tab.Screen name="Bookmarks" component={BookmarkedNavigator} />
      {user.admin && <Tab.Screen name="Add" component={AddLocation} />}
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

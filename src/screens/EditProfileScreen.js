import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import TextComp from '../components/TextComp';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

class EditProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.screen}>
        <TextComp>Edit Profile</TextComp>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default EditProfileScreen;

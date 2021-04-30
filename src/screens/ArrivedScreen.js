import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import TextComp from '../components/TextComp';
import Colors from '../constants/Colors';

class ArrivedScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <TextComp>YOU ARRIVED!</TextComp>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
});

export default ArrivedScreen;

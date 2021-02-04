import React, {Fragment} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import TextComp from '../components/TextComp';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

class ReportScreen extends React.Component {
  render() {
    return (
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: Colors.primaryColor}} />

        <View style={styles.screen}>
          <Header
            centerComponent={
              <TextComp bold style={{color: 'white', fontSize: 25}}>
                RAKNETI
              </TextComp>
            }
            leftComponent={
              <Ionicons
                name="ios-menu"
                size={30}
                color="white"
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                }}
              />
            }
          />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ReportScreen;

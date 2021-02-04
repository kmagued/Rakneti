import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {tryLocalSignin} from '../store/actions/users';
import {connect} from 'react-redux';

class LoadingScreen extends React.Component {
  componentDidMount() {
    this.props.try();
  }

  render() {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = {
  try: tryLocalSignin,
};

export default connect(null, mapDispatchToProps)(LoadingScreen);

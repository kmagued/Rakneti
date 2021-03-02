import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import TextComp from '../components/TextComp';

class HistoryDetailScreen extends React.Component {
  state = {};

  render() {
    const item = this.props.route.params.itemDetail;

    return (
      <SafeAreaView style={styles.screen}>
        <TextComp>History Detail</TextComp>
        <TextComp>{item.name}</TextComp>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryDetailScreen;

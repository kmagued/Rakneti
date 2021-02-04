import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const LicensePlateInput = (props) => {
  return (
    <View style={{alignItems: 'center', marginVertical: 20}}>
      <View style={styles.plateContainer}>
        <View style={{padding: 15, backgroundColor: '#00ABFF'}} />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={styles.container}>
            <TextInput style={styles.input}>{props.plateNumber[4]}</TextInput>
            <TextInput style={styles.input}>{props.plateNumber[5]}</TextInput>
            <TextInput style={styles.input}>{props.plateNumber[6]}</TextInput>
            {props.plateNumber[7] && (
              <TextInput style={styles.input}>{props.plateNumber[7]}</TextInput>
            )}
          </View>
          <View style={{borderWidth: 0.5, borderColor: 'grey'}}></View>
          <View style={styles.container}>
            <TextInput style={styles.input}>{props.plateNumber[2]}</TextInput>
            <TextInput style={styles.input}>{props.plateNumber[1]}</TextInput>
            <TextInput style={styles.input}>{props.plateNumber[0]}</TextInput>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  plateContainer: {
    width: '40%',
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.5,
    padding: 10,
    justifyContent: 'center',
  },
  input: {
    padding: 5,
  },
});

export default LicensePlateInput;

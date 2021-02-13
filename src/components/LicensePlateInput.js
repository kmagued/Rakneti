import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Colors from '../constants/Colors';

const LicensePlateInput = (props) => {
  return (
    <View style={styles.plate}>
      <View style={styles.plateContainer}>
        <View style={{padding: 15, backgroundColor: Colors.primaryColor}} />
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
  plate: {
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 8,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
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

import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Platform} from 'react-native';
import Colors from '../constants/Colors';
import TextComp from './TextComp';

const Input = (props) => {
  const [borderColor, setBorderColor] = useState('white');
  const [borderWidth, setBorderWidth] = useState(0.5);

  return (
    <View>
      <View
        style={{
          ...styles.inputContainer,
          borderColor: props.error ? Colors.error : borderColor,
          borderWidth: props.error ? 2 : borderWidth,
        }}>
        {props.icon}
        <TextInput
          {...props}
          keyboardType={props.email ? 'email-address' : 'default'}
          value={props.value}
          style={styles.input}
          onFocus={() => {
            setBorderWidth(2);
            setBorderColor(Colors.primaryColor);
          }}
          onBlur={() => {
            setBorderWidth(0.5);
            setBorderColor('white');
          }}
        />
      </View>
      {props.error && (
        <View style={{width: '80%', alignSelf: 'center'}}>
          <TextComp bold style={{color: Colors.error}}>
            {props.error}
          </TextComp>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 8,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 25,
    marginTop: 10,
    paddingLeft: 20,
    marginBottom: 5,
  },
  input: {
    width: '90%',
    marginLeft: 10,
    fontSize: 14,
    padding: Platform.OS === 'ios' ? 15 : null,
    fontFamily: 'Ubuntu-Bold',
  },
});

export default Input;

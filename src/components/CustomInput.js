import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import TextComp from './TextComp';
import Colors from '../constants/Colors';

const CustomInput = (props) => {
  const [borderColor, setBorderColor] = useState('#333333');
  const [borderWidth, setBorderWidth] = useState(1);

  return (
    <View style={{marginVertical: 5}}>
      <View
        style={{
          alignSelf: 'baseline',
          marginLeft: 70,
          paddingHorizontal: 5,
          marginBottom: -8,
          backgroundColor: 'white',
          zIndex: 1,
        }}>
        <TextComp
          bold
          style={{color: '#333333', fontSize: 14, color: borderColor}}>
          {props.title}
        </TextComp>
      </View>
      <TextInput
        {...props}
        style={{...styles.input, borderColor, borderWidth}}
        onFocus={() => {
          setBorderColor(Colors.primaryColor);
          setBorderWidth(2);
        }}
        onBlur={() => {
          setBorderColor('#333333');
          setBorderWidth(1);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    borderWidth: 1,
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 25,
    paddingLeft: 25,
    marginBottom: 5,
    padding: 15,
    fontFamily: 'Ubuntu-Regular',
  },
});

export default CustomInput;

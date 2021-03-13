import React, {useState} from 'react';
import {TouchableHighlight, StyleSheet, Dimensions} from 'react-native';
import TextComp from './TextComp';
import Colors from '../constants/Colors';
import {Icon} from 'react-native-elements';

const Box = (props) => {
  const [color, setColor] = useState('grey');

  return (
    <TouchableHighlight
      style={styles.box}
      underlayColor={Colors.primaryColor}
      onPress={() => {}}
      onShowUnderlay={() => setColor('white')}
      onHideUnderlay={() => setColor('grey')}>
      <>
        <Icon name={props.iconName} color={color} type={props.type} size={40} />
        <TextComp bold style={{...styles.boxText, color: color}}>
          {props.text}
        </TextComp>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  boxText: {
    color: 'grey',
    textAlign: 'center',
  },
  box: {
    width: Dimensions.get('window').width / 2.5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'whitesmoke',
    height: Dimensions.get('window').width / 2.5,
    borderRadius: 15,
    margin: 5,
  },
});

export default Box;

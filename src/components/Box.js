import React, {useState} from 'react';
import {TouchableHighlight, StyleSheet, View} from 'react-native';
import TextComp from './TextComp';
import Colors from '../constants/Colors';
import {Icon} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';

const Box = (props) => {
  const [color, setColor] = useState(Colors.secondary);
  const [iconColor, setIconColor] = useState('#b6b6b6');

  return (
    <TouchableHighlight
      style={{
        ...styles.box,
        borderTopRightRadius: props.end ? 0 : null,
        borderTopLeftRadius: props.end ? 0 : null,
        marginBottom: props.end ? 20 : null,
        borderBottomLeftRadius: props.top ? 0 : null,
        borderBottomRightRadius: props.top ? 0 : null,
        borderRadius: props.mid ? 0 : 10,
      }}
      underlayColor="rgba(52,212,132, 0.7)"
      onPress={props.onPress}
      onShowUnderlay={() => {
        setColor('white');
        setIconColor('white');
      }}
      onHideUnderlay={() => {
        setColor(Colors.secondary);
        setIconColor('#b6b6b6');
      }}>
      <>
        <View
          style={{
            ...styles.row,
            ...styles.btn,
          }}>
          <View style={styles.row}>
            <Icon
              name={props.iconName}
              color={iconColor}
              type={props.iconType}
              size={25}
            />
            <TextComp style={{...styles.text, color}}>{props.title}</TextComp>
          </View>
          <Entypo name="chevron-small-right" size={25} color={iconColor} />
        </View>
        <View style={styles.line} />
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    padding: 10,
    marginLeft: 10,
  },
  box: {
    width: '85%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: '#e6e6e6',
    width: '87%',
    alignSelf: 'center',
  },
  btn: {
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
});

export default Box;

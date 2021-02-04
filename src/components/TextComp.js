import React from 'react';
import {Text} from 'react-native';

const TextComp = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        fontFamily: props.bold
          ? 'Ubuntu-Medium'
          : props.black
          ? 'Ubuntu-Bold'
          : 'Ubuntu-Regular',
      }}>
      {props.children}
    </Text>
  );
};

export default TextComp;

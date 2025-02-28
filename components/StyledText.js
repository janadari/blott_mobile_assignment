import React from 'react';
import { Text, StyleSheet } from 'react-native';

const StyledText = ({ style, children, ...props }) => {
  return <Text style={[styles.default, style]} {...props}>{children}</Text>;
};

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Roboto-Regular', 
  },
});

export default StyledText;

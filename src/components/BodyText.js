
import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import StyledText from './StyledText';

const BodyText = ({ text, style }) => {

    return (

        <StyledText style={[styles.body, style]}>{text}</StyledText>

    )

}

const styles = StyleSheet.create({
    body: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0,
        color: '#737373',
        paddingTop: 16,
        paddingBlock: 16
    }
})

export default BodyText
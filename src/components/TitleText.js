import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import StyledText from "./StyledText";

const TitleText = ({ title }) => {
  return (
    <View>
      <StyledText style={styles.title}>{title}</StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 30,
    lineHeight: 37.5,
    letterSpacing: 0,
    color: "#000",
  },
});

export default TitleText;

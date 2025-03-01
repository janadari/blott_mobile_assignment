import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native";

// import fabActive from '../assets/images/fab_active.png';
// import fabInactive from '../assets/images/fab_inactive.png';

const CustomButton = ({ text, onClick }) => {
  function onClickB() {
    console.log("clicklk");
    onClick();
  }
  return (
    <TouchableOpacity style={styles.fab} onPress={() => onClickB()}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    borderRadius: 20,
    backgroundColor: "#523AE4",
    padding: 12,
    borderRadius: 24,
    width: "100%",
    alignItems: "center",
  },
  btnText: {
    color: "#FAFAFA",
    fontWeight: 500,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 24,
  },
});

export default CustomButton;

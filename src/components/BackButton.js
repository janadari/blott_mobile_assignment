import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import backButton from "../../assets/images/back_button.png";

const BackButton = () => {
  const navigation = useNavigation();

  const backBtnClick = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.warn("Can't go back");
    }
  };

  return (
    <TouchableOpacity onPress={backBtnClick} style={styles.button}>
      <Image source={backButton} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 62,
    left: 10,
    padding: 10,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

export default BackButton;

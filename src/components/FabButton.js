import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

import fabActive from "../../assets/images/fab_active.png";
import fabInactive from "../../assets/images/fab_inactive.png";

const AppButtons = ({ isActive, onClick }) => {
  function onClickB() {
    onClick();
  }
  return (
    <TouchableOpacity style={styles.fab} onPress={() => onClickB()}>
      <Image source={isActive ? fabActive : fabInactive} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
  },
  image: {
    width: 56,
    height: 56,
  },
});

export default AppButtons;

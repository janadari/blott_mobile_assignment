import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import FastImage from "react-native-fast-image";

const NewsCard = ({ item }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const openLink = () => {
    console.log("te", item);

    Linking.openURL(item?.url).catch((err) =>
      console.error("Failed to open URL: ", err)
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => openLink()}>
      <View style={styles.flexContainer}>
        <View style={styles.flexLeft}>
          <FastImage
            style={styles.img}
            source={{
              uri: item?.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={styles.flexRight}>
          <View style={styles.innerContainer}>
            <Text style={styles.intro}>{item.source.toUpperCase()}</Text>
            <Text style={styles.intro}>{formatDate(item.datetime)}</Text>
          </View>
          <Text style={styles.description}>
            {item.headline.length > 90
              ? item.headline.substring(0, 90) + "..."
              : item.headline}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: 16 },
  flexContainer: {
    paddingTop: 16,
    paddingBottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  flexLeft: {
    flex: 1,
  },
  flexRight: {
    flex: 2,
  },
  intro: {
    color: "#ffffff",
    fontFamily: "Rubic",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 16,
  },
  description: {
    color: "#ffffff",
    fontFamily: "Roboto",
    fontWeight: 500,
    fontStyle: 20,
    lineHeight: 24,
  },
  img: {
    width: 100,
    height: 100,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
});

export default NewsCard;

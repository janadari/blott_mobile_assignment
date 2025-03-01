import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import FastImage from "react-native-fast-image";

const NewsCard = ({ item }) => {
  const [loading, setLoading] = useState(true);

  //   convert time stamp to the format DD / month / YYYY
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  //   open a link in web
  const openLink = () => {
    Linking.openURL(item?.url).catch((err) =>
      console.error("Failed to open URL: ", err)
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => openLink()}>
      <View style={styles.flexContainer}>
        <View style={styles.flexLeft}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          <FastImage
            style={styles.img}
            source={{
              uri: item?.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        </View>
        <View style={styles.flexRight}>
          <View style={styles.innerContainer}>
            <Text style={styles.intro}>{item.source.toUpperCase()}</Text>
            <Text style={styles.intro}>{formatDate(item.datetime)}</Text>
          </View>
          {/* check for 90 strings and return only string less than 90, if more than that just show ... */}
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
  loadingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
});

export default NewsCard;

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserName from "../hooks/useUserName";
import { FINNHUB_API_KEY } from "@env";
import NewsCard from "../components/NewsCard";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = () => {
  const { userName } = useUserName();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    console.log("username-home", userName);
  });
  useEffect(() => {
    console.log("username", userName);

    const fetchData = async () => {
      let datalist = await getData();
      setData(datalist || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  async function getData() {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMsg("Something went wrong. Please try again later.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.container}>
        <Text style={styles.home_title}>Hey {userName}</Text>

        <ScrollView style={{ flex: 1, marginTop: 16 }}>
          {loading ? (
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <View>
              {errorMsg ? (
                <Text style={styles.errorMsg}>{errorMsg}</Text>
              ) : (
                <View>
                  {data.map((item, index) => (
                    <NewsCard key={index} item={item} />
                  ))}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "#05021B",
  },
  home_title: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontFamily: "Roboto",
    fontSize: 32,
    lineHeight: 35.2,
    marginBottom: 16,
  },
  errorMsg: {
    color: "#FFFFFF",
    fontFamily: "Rubik",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 24,
  },
});
export default HomeScreen;

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUserName from "../hooks/useUserName";
import { FINNHUB_API_KEY } from "@env";
import NewsCard from "../components/NewsCard";

const HomeScreen = () => {
  const userName = useUserName();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let datalist = await getData();
      setData(datalist || []); // Ensure data is always an array
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
      console.log("data", data);

      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  }

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.container}>
        <Text>Hey {userName}</Text>

        {loading ? (
          <Text>loading..</Text>
        ) : (
          <View>
            {data.map((item, index) => (
              <NewsCard key={index} item={item} />
            ))}
          </View>
        )}
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
    padding: 24,
    height: "100%",
  },
});
export default HomeScreen;

import React, { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./src/screens/HomeScreen";
import InfoScreen from "./src/screens/InfoScreen";
import NotificationScreen from "./src/screens/AskNotificationScreen";
import useUserName from "./src/hooks/useUserName";

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const userName = useUserName();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          userName !== null || userName !== undefined
            ? "HomeScreen"
            : "InfoScreen"
        }
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InfoScreen"
          component={InfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: "red",
    height: "100%",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;

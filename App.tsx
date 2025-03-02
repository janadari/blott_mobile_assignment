import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import InfoScreen from "./src/screens/InfoScreen";
import NotificationScreen from "./src/screens/AskNotificationScreen";
import useUserName from "./src/hooks/useUserName";
import { ActivityIndicator, Image, View } from "react-native";

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const { userName, loading } = useUserName();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
        }}
      ></View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userName ? "InfoScreen" : "InfoScreen"}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false, gestureEnabled: false }}
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

export default App;

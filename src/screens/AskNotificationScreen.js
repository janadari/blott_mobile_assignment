import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Platform,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import notificationIcon from "../../assets/images/notification_icon.png";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";

const NotificationScreen = ({ navigation }) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) onContinueClick();
  }, [isClicked]);

  const checkNotificationPermission = async () => {
    // since ios.Notification unavailable, added camera permission for now
    const permission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.POST_NOTIFICATIONS;

    const status = await check(permission);

    if (status === RESULTS.GRANTED) {
      console.log("Notification permission already granted.");
      onContinueClick();
    } else {
      try {
        const result = await request(permission);
        console.log("permission result", result);

        // There is a issue opening default notification permission dialog,for now, added custom dialog saying open the setting
        if (result === "unavailable") {
          askToOpenSettings();
        }
      } catch (e) {
        console.log("error", e);
        askToOpenSettings();
      } finally {
        // even allow or no, go to home screen
        onContinueClick();
      }
    }
  };

  const askToOpenSettings = () => {
    Alert.alert(
      "“Blott” Would Like to Send You Notifications",
      "Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.",
      [
        { text: "Cancel", style: "cancel", onPress: () => setIsClicked(true) },
        {
          text: "Open Settings",
          onPress: () => {
            Linking.openSettings();
            setIsClicked(true);
          },
        },
      ]
    );
  };

  const onContinueClick = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <BackButton />
      <View>
        <Image source={notificationIcon} style={styles.icon} />
      </View>
      <Text style={styles.title}>Get the most out of Blott ✅</Text>
      <Text style={styles.centerAlign}>
        Allow notifications to stay in the loop with your payments, requests,
        and groups.
      </Text>
      <View style={styles.btnContainer}>
        <CustomButton
          text="Continue"
          onClick={() => checkNotificationPermission()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  centerAlign: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24,
    color: "#737373",
    textAlign: "center",
    marginTop: 16,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 30,
    color: "#000",
  },
  icon: {
    width: 98,
    height: 98,
    marginBottom: 24,
  },
  btnContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default NotificationScreen;

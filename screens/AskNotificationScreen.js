import React,{useEffect} from "react"
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import BodyText from "../components/BodyText";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';
import { Alert } from "react-native";
import notificationIcon from '../assets/images/notification_icon.png'
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";

const NotificationScreen = ({navigation}) => {

    const onContinueClick =()=> {
    // ask to enable notification
    // checkNotificationPermission()
    navigation.navigate('HomeScreen')
    }

    


    const checkNotificationPermission = async () => {
        const permission =
        Platform.OS === 'ios' ? PERMISSIONS.IOS.NOTIFICATIONS : PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
    
    const result = await check(permission);
    
    console.log('Permission result:', result);
    
    // If permission is not granted, request it
    if (result !== RESULTS.GRANTED) {
        const requestResult = await request(permission);
        console.log('Request result:', requestResult);
        if (requestResult === RESULTS.GRANTED) {
            console.log('Permission granted!');
        } else {
            requestNotificationPermission()
            console.log('Permission denied!');
        }
    } else {
        console.log('Permission already granted!');
    }
    }


    const requestNotificationPermission = async () => {
        try {
            const permission =
                Platform.OS === 'ios' ? PERMISSIONS.IOS.NOTIFICATIONS : PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
    
            const result = await request(permission);
    
            if (result === RESULTS.GRANTED) {
                console.log('Permission granted');
            } else if (result === RESULTS.DENIED) {
                console.log('Permission denied');
            } else if (result === RESULTS.BLOCKED) {
                console.log('Permission blocked');
                Alert.alert(
                    'Permission Blocked',
                    'You need to enable notifications manually in settings.'
                );
            }
        } catch (e) {
            console.log('Error requesting notification permission:', e);
        }
    };



    return (

        <SafeAreaView style={styles.sectionContainer}>
            <BackButton/>
            <View>
                <Image source={notificationIcon} style={styles.icon}></Image>
            </View>
            <Text style={styles.title} >Get the most out of Blott ✅</Text>
            <BodyText text={"Allow notifications to stay in the loop with your payments, requests and groups."} style={styles.centerAlign}></BodyText>

            <View style={styles.btnContainer}>
                  <CustomButton  text = "continue" onClick={()=>onContinueClick()} />

                  </View>

        </SafeAreaView>

    )
}
const styles = StyleSheet.create({

    sectionContainer: {
        flex: 1,
        padding: 24,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'justify'
    },

    centerAlign: {
        textAlign: 'center'
    }
    ,
    title: {
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 30,
        letterSpacing: 0,
        color: '#000',

    },
    icon: {
        width: 98,
        height: 98,
        marginBottom: 24
    }
    , btnContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,

        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    }
})

export default NotificationScreen;
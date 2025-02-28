import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import FabButton from '../components/FabButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const InfoScreen = ({ navigation }) => {

    const [firstName,setFirstName] = useState('shehani')
    const [lastName, setLastName] = useState('janadari')

    useEffect(()=>{
        console.log('test')
    },[firstName])

    const onClickBtn =async () => {
     await saveUserData('USER_INFO',{first_name:firstName,last_name:lastName})
        navigation.navigate('NotificationScreen');
    }

    const saveUserData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
          console.log('Data saved successfully!');
        } catch (e) {
          console.error('Error saving data', e);
        }
      };


    return (
        <SafeAreaView style={styles.sectionContainer}>
         <KeyboardAvoidingView
            style={{ flex: 1 }} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  // Adjust the behavior based on the platform
        >
            <View style={styles.container}>
                <TitleText title={'Your legal name'}></TitleText>

                <BodyText text={'We need to know a bit about you so that we can create your account.'} ></BodyText>

                <TextInput
                    style={styles.input}
                    autoFocus
                    value={firstName}
                    placeholder="First name"
                    placeholderTextColor="#A3A3A3" 
                    onChangeText={(text)=>setFirstName(text)}
                />

                <TextInput
                    style={styles.input}
                    value={lastName}
                    placeholder="Last name"
                    placeholderTextColor="#A3A3A3" 
                    onChangeText={(text)=>setLastName(text)}
                />

                <FabButton style={styles.fabButton} isActive={firstName && lastName}  onClick={()=>{(firstName && lastName) && onClickBtn()}} />
            </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,  

    },
    sectionContainer: {
        flex: 1,
        padding: 24,
        height: '100%'
      },
    title: {
        fontWeight: '700',
        fontSize: 30,
        lineHeight: 37.5,
        letterSpacing: 0,
        color: '#000',
    },
    text: {
        fontSize: 20,
    },
    input: {
        borderBottomWidth: 0.5,
        borderColor: '#A3A3A3',
        width: '100%',
        padding: 10,
        marginTop: 16,
        fontSize: 20,
        marginBottom: 16,
    },
    fabButton: {
        position: 'absolute',
        bottom: 30,  
        right: 30,  
    },
});

export default InfoScreen;

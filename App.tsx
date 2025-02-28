/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import InfoScreen from './screens/InfoScreen';
import HomeScreen from './screens/HomeScreen';
import NotificationScreen from './screens/AskNotificationScreen'

import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack = createStackNavigator();

function App(): React.JSX.Element {
  
  const [isUserAvailable,setIsUserAvailable] = useState(false)

  useEffect(()=>{
  findSavedData('USER_INFO')
  },[])

  const findSavedData = async (key:any) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Retrieved value:', value);
        return value;
      }
    } catch (e) {
      console.error('Error retrieving data', e);
    }
  };

  return (
    
      <NavigationContainer>
      <Stack.Navigator initialRouteName={isUserAvailable ? "HomeScreen" : "InfoScreen"}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="InfoScreen" component={InfoScreen} options={{headerShown:false}} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{headerShown:false}} />
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
    backgroundColor: 'red',
    height: '100%'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

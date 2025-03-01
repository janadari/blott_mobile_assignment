
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserName = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('USER_FIRST_NAME');
        if (storedUserName !== null) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error('Error retrieving username from AsyncStorage', error);
      }
    };

    fetchUserName();
  }, []);

  return userName;
};

export default useUserName;

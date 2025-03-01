import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUserName = () => {
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem("USER_FIRST_NAME");

        setUserName(storedUserName);
      } catch (error) {
        console.error("Error retrieving username from Async Storage", error);
      } finally {
        setLoading(false);
      }
    };

    // this function is to get user's first name from async storage
    fetchUserName();
  }, []);

  return { userName, loading };
};

export default useUserName;

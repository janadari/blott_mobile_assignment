import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUserName = () => {
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem("USER_FIRST_NAME");
        console.log("sti", storedUserName);

        setUserName(storedUserName);
      } catch (error) {
        console.error("Error retrieving username from AsyncStorage", error);
      } finally {
        setLoading(false); // Data has loaded
      }
    };

    fetchUserName();
  }, []);

  return { userName, loading };
};

export default useUserName;

import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

const useAppwrite = (apiCallFn) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await apiCallFn();
      setData(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return {
    data,
    isLoading,
    refetch,
  };
};

export default useAppwrite;

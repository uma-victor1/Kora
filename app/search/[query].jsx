import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
const Search = () => {
  const { query } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <View>
        <Text className="text-3xl text-white">Search</Text>
      </View>
    </SafeAreaView>
  );
};

export default Search;

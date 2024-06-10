import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { usePathname, router } from "expo-router";
import React, { useState } from "react";
import { icons } from "../constants";

const SearchInput = () => {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  return (
    <View className="flex-row justify-between border-[1px] items-center rounded-xl focus:border-secondary relative">
      <TextInput
        className="flex-1 w-full border-[1px] font-pregular rounded-xl text-gray-100 text-base bg-black-100 px-4 py-5 border-black-200"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing Query",
              "Please input something to search database"
            );
          }
          if (pathname.startsWith("./search")) {
            router.setParam({ query });
          } else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          resizeMode="contain"
          className="h-5 w-5 absolute right-4 -top-2"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

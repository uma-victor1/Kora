import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";

const TrendingVideos = () => {
  return (
    <FlatList
      data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.id}</Text>
      )}
      horizontal
    ></FlatList>
  );
};

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Uma Victor
                </Text>
              </View>
              <Image
                source={images.logoSmall}
                className="h-9 w-9"
                resizeMode="contain"
              ></Image>
            </View>
            <View className="flex-row justify-between items-center relative">
              <TextInput
                className="flex-1 w-full border-[1px] font-psemibold rounded-xl text-white text-base bg-black-100 px-4 py-6 border-black-200"
                // value={value}
                placeholder="Search for a video topic"
                placeholderTextColor="#CDCDE0"
                // onChangeText={handleChangeText}
              />
              <Image
                source={icons.search}
                resizeMode="contain"
                className="h-5 w-5 absolute right-4"
              />
            </View>
            <Text className="text-base text-gray-100 leading-5 font-medium tracking-wide">
              Trending Videos
            </Text>
            <TrendingVideos />
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            <Image
              source={images.empty}
              resizeMode="contain"
              className="h-20 w-20 mb-4"
            />
            <Text className="text-base text-gray-100 leading-[24px] font-medium tracking-wide">
              No videos found.
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }
      ></FlatList>
    </SafeAreaView>
  );
};

export default Home;

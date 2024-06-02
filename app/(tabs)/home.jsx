import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";
import EmptyComponent from "../../components/EmptyComponent";
import { getAllPosts } from "../../lib/appwrite";
import useAppwrite from "../../hooks/useAppwrite";
import Video from "../../components/Video";

const TrendingVideos = ({ posts }) => {
  return (
    <View className="">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        horizontal
      ></FlatList>
    </View>
  );
};

const Home = () => {
  const { data: videos, isLoading, refetch } = useAppwrite(getAllPosts);

  console.log(JSON.stringify(...videos, null, "\t"), "posts");
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);

    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Video video={item} />}
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
                className="flex-1 w-full border-[1px] font-pregular rounded-xl text-gray-100 text-base bg-black-100 px-4 py-5 border-black-200"
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
            <Text className="text-lg text-gray-100 leading-5 font-pregular tracking-wide pb-5">
              Latest Videos
            </Text>
            <TrendingVideos posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyComponent
            title="No videos"
            subtitle="You can add your own videos."
          />
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

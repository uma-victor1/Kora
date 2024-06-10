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
import VideoCard from "../../components/Video";
import { getLatestPosts } from "../../lib/appwrite";
import TrendingVideos from "../../components/TrendingVideos";
import SearchInput from "../../components/SearchInput";
const Home = () => {
  const { data: videos, isLoading, refetch } = useAppwrite(getAllPosts);
  const { data: latestVideos } = useAppwrite(getLatestPosts);

  console.log(JSON.stringify(...latestVideos, null, "\t"), "posts");
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
        renderItem={({ item }) => <VideoCard video={item} />}
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
            <SearchInput />
            <Text className="text-lg text-gray-100 leading-5 font-pregular tracking-wide pb-5">
              Latest Videos
            </Text>
            <TrendingVideos trendingVideos={latestVideos ?? []} />
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

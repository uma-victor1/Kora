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

import useAppwrite from "../../hooks/useAppwrite";
import VideoCard from "../../components/Video";
import { searchPosts } from "../../lib/appwrite";
import TrendingVideos from "../../components/TrendingVideos";
import SearchInput from "../../components/SearchInput";
import { useLocalSearchParams } from "expo-router";
const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: videos, isLoading, refetch } = useAppwrite(searchPosts(query));

  console.log(JSON.stringify(...videos, null, "\t"), "posts");

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <Text className="font-pmedium text-sm text-gray-100">
              Search results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyComponent
            title="No videos found"
            subtitle="No videos found for this search"
          />
        )}
      ></FlatList>
    </SafeAreaView>
  );
};

export default Search;

import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";
const VideoCard = ({ video }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{
                uri:
                  video.creators !== null
                    ? video.creators.avatar
                    : "https://cloud.appwrite.io/v1/avatars/initials?name=Uma&project=66410fcf0003be863154",
              }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            ></Image>
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {video.title}
            </Text>
            <Text
              className=" font-pregular text-xs text-gray-100"
              numberOfLines={1}
            >
              {video.creators !== null && video.creators.username}
            </Text>
          </View>
        </View>
        <View className="pt-2 ">
          <Image
            source={icons.menu}
            className="w-5 h-5"
            resizeMode="contain"
          ></Image>
        </View>
      </View>
      {/* vide0 */}
      {play ? (
        <Video
          onError={(err) => console.log(err, "errorplay")}
          source={{
            uri: video.video,
          }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
          }}
        >
          <Image
            source={{ uri: video.thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          ></Image>
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

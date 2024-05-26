import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyComponent = ({ title, subtitle }) => {
  return (
    <View className="flex w-[90%] m-auto justify-center items-center">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="h-[200px] w-[270px]"
      />
      <Text className="text-xl text-white leading-[24px] font-psemibold tracking-wide mb-4">
        {title}
      </Text>
      <Text className="text-base text-gray-100 leading-[24px] font-pmedium tracking-wide mb-4">
        {subtitle}
      </Text>
      <CustomButton title="Create Video" containerStyles="w-full" />
    </View>
  );
};

export default EmptyComponent;

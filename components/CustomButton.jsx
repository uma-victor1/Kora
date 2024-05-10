import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CustomButton = ({title, handlePress, containerStyles, textStyle, isLoading}) => {
  return (
      <TouchableOpacity className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading? 'opacity-50':''}`} onPress={handlePress} activeOpacity={0.7} disabled={isLoading}>
          <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
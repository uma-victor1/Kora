import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const create = () => {
  const [loading, isLoading] = useState;

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Create</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;

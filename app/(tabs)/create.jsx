import { View, Text, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const create = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Create</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;

import { View, Text, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../contexts/globalContext";
const create = () => {
  const { logout } = useGlobalContext();
  return (
    <SafeAreaView>
      <ScrollView>
        <Text onPress={() => logout()}>Create</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;

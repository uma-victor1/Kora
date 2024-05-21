import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../contexts/globalContext";
import CustomButton from "../../components/CustomButton";

const profile = () => {
  const { logout } = useGlobalContext();
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Profile</Text>
        <CustomButton
          title="Logout"
          handlePress={() => {
            logout();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;

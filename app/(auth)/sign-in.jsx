import { StyleSheet, Text, View, ScrollView, Image, Alert } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { useGlobalContext } from "../../contexts/globalcontext";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, user } = useGlobalContext();

  const submit = async () => {
    try {
      if (!form.email || !form.password) {
        Alert.alert("Error", "Fill in all credentials before submitting");
        return;
      }

      const user = await signIn(form.email, form.password);
      if (!user) {
        Alert.alert("Error", "user doesn't exist");
      }
      router.push("../");
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log into Kora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => {
              setForm((prevForm) => ({ ...prevForm, email: e }));
            }}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => {
              setForm((prevForm) => ({ ...prevForm, password: e }));
            }}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center items-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?{" "}
            </Text>
            <Link
              className="text-lg text-secondary font-semibold"
              href="/sign-up"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

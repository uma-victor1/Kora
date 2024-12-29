import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ScrollView } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";
import { useGlobalContext } from "../contexts/globalcontext";

export default function App() {
  const { user } = useGlobalContext();
  console.log(user, "user");
  if (user) {
    return <Redirect href="/home"></Redirect>;
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          ></Image>
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          ></Image>

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              {" "}
              Discover Endless Possibilities with {""}{" "}
              <Text className="text-secondary-200">Kora</Text>
              <Image
                source={images.path}
                resizeMode="contain"
                className="w-[136px] absolute -right-8 -bottom-2"
              />
            </Text>
          </View>

          {/* <Link href='/home'> link to</Link> */}
          <Text className="font-pregular text-sm text-gray-100 mt-7 text-center">
            {" "}
            Where creativity meets innovation. Embark on a mission of limitless
            opportuinities with Kora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles="w-full mt-7"
          ></CustomButton>
          <StatusBar backgroundColor="#161622" style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

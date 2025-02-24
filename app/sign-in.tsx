import { View, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PText from "@/components/ui/ptext";

import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

export default function SignIn() {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href={"/"} />;

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="flex justify-between items-center h-full bg-[#ed7d2d] ">
        <View className="flex justify-center items-center mt-[20rem]">
          <PText className="text-white text-6xl font-bold">Casengo</PText>
        </View>
        <View className="px-10 py-10 bg-white w-full h-[350px] rounded-2xl">
          <PText className=" text-slate-500 text-center mt-2">
            WELCOME TO CASENGO
          </PText>
          <PText className="text-2xl text-[#ed7d2d] font-bold text-center mt-2">
            Let's Get You Started!
          </PText>
          <PText className="text-lg text-center mt-12 text-slate-500">
            Choose your login Option
          </PText>
          <TouchableOpacity
            style={{
              shadowColor: "black",
              shadowOffset: { width: -2, height: 6 },
              shadowOpacity: 1,
              shadowRadius: 1,
              elevation: 3,
            }}
            className="bg-white border border-neutral-400 w-full h-14 mt-4 rounded-xl justify-center items-center"
            onPress={handleLogin}
          >
            <View className="flex flex-row justify- gap-5 items-center ">
              <Image
                source={icons.google} // Ensure this is require() or { uri: string }
                className="w-8 h-8"
                resizeMode="contain"
              />
              <PText className="text-lg w-52">Continue with Google</PText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: "black",
              shadowOffset: { width: -2, height: 6 },
              shadowOpacity: 1,
              shadowRadius: 1,
              elevation: 3,
            }}
            className="bg-white border border-neutral-400 w-full h-14 mt-6 rounded-xl justify-center items-center"
            onPress={handleLogin}
          >
            <View className="flex flex-row justify- gap-5 items-center ">
              <Image
                source={icons.facebook} // Ensure this is require() or { uri: string }
                className="w-8 h-8"
                resizeMode="contain"
              />
              <PText className="text-lg w-52">Continue with Facebook</PText>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

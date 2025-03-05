import { View, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import PText from "@/components/ui/ptext";

import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

import OrangeButtom from "../assets/images/button-orange-1.png";
import WhiteButtom from "../assets/images/button-white-1.png";

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#0000FF", // Blue shadow
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10, // For Android
  },
});

export default function Start() {
  const { loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href={"/"} />;

  // const handleLogin = async () => {
  //   const result = await login();

  //   if (result) {
  //     refetch();
  //   } else {
  //     Alert.alert("Error", "Failed to login");
  //   }
  // };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="flex justify-center items-center h-full">
        {/* <View className="flex justify-center items-center mt-[20rem]">
          <PText className="text-white text-6xl ">Casengo</PText>
        </View> */}
        {/* <View className="px-10 py-10 bg-white w-full h-[350px] rounded-2xl">
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
        </View> */}
        <View className="flex gap-14 mb-14">
          <View className="relative flex gap-10 justify-center items-center">
            <PText
              className="text-2xl text-[#323842]"
              style={{
                textShadowColor: "#323842",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 0.5,
              }}
            >
              Already have an account?
            </PText>
            <Image
              source={OrangeButtom} // Ensure this is require() or { uri: string }
              className=" w-[400px] h-[65px]"
              resizeMode="contain"
            />
            <TouchableOpacity
              // style={styles.boxShadow}
              // className="bg-white border border-neutral-400 w-full h-14 mt-6 rounded-xl justify-center items-center"
              className=" w-[400px] h-[65px] absolute top-[60px] flex justify-center items-center"
            >
              <PText className="text-white text-2xl font-bold">SIGN IN</PText>
            </TouchableOpacity>
          </View>
          <View className="border border-1 border-[#dee1e6]" />
          <View className="relative flex gap-10 justify-center items-center">
            <PText
              className="text-2xl text-[#323842] line-30 font-[ABeeZee]"
              style={{
                textShadowColor: "#323842",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 0.5,
              }}
            >
              New to Casengo?
            </PText>
            <Image
              source={WhiteButtom} // Ensure this is require() or { uri: string }
              className=" w-[400px] h-[65px]"
              resizeMode="contain"
            />
            <TouchableOpacity
              // style={styles.boxShadow}
              // className="bg-white border border-neutral-400 w-full h-14 mt-6 rounded-xl justify-center items-center"
              className=" w-[400px] h-[65px] absolute top-[60px] flex justify-center items-center"
            >
              <PText className="text-2xl text-[#ed7d2d] font-bold">
                GET STARTED
              </PText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

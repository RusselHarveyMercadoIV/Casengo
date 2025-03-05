import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PText from "@/components/ui/ptext";

import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

import OrangeButtom from "../assets/images/button-orange-1.png";
import WhiteButtom from "../assets/images/button-white-1.png";

export default function Start() {
  const { loading, isLoggedIn } = useGlobalContext();
  const [currentStep, setCurrentStep] = useState<number>(0);

  if (!loading && isLoggedIn) return <Redirect href={"/"} />;

  const handleStepChange = (step: number) => {
    if (currentStep === 6 && step > 0) return;
    setCurrentStep((prevStep) => prevStep + step);
  };

  let content = (
    <View className="absolute top-1/4 flex gap-14 mb-14">
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
          source={OrangeButtom}
          className=" w-[350px] h-[65px]"
          resizeMode="contain"
        />
        <TouchableOpacity className=" w-[350px] h-[65px] absolute top-[60px] flex justify-center items-center">
          <PText className="text-white text-xl font-bold">SIGN IN</PText>
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
          source={WhiteButtom}
          className=" w-[350px] h-[65px]"
          resizeMode="contain"
        />
        <TouchableOpacity
          className=" w-[350px] h-[65px] absolute top-[60px] flex justify-center items-center"
          onPress={() => handleStepChange(1)}
        >
          <PText className="text-xl text-[#ed7d2d] font-bold">
            GET STARTED
          </PText>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (currentStep >= 1) {
    content = <View></View>;
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="flex justify-between items-center h-full">
        {currentStep > 0 && (
          <View className="relative flex flex-row items-center justify-center w-full">
            <TouchableOpacity
              onPress={() => handleStepChange(-1)}
              className="absolute w-6 h-6 left-4 top-4"
            >
              <Image source={icons.leftArrow} className="w-6 h-6" />
            </TouchableOpacity>

            <View
              className={
                " flex flex-row  justify-center items-center gap-4 bg-[#f8f9fa] w-[230px] h-[40px] rounded-full mt-2"
              }
            >
              <View
                className={`w-6 h-6 rounded-full ${
                  currentStep >= 1 ? "bg-[#ed7d2d]" : "bg-[#dee1e6]"
                }`}
              />
              <View
                className={`w-6 h-6 rounded-full ${
                  currentStep >= 2 ? "bg-[#ed7d2d]" : "bg-[#dee1e6]"
                }`}
              />
              <View
                className={`w-6 h-6 rounded-full ${
                  currentStep >= 3 ? "bg-[#ed7d2d]" : "bg-[#dee1e6]"
                }`}
              />
              <View
                className={`w-6 h-6 rounded-full ${
                  currentStep >= 4 ? "bg-[#ed7d2d]" : "bg-[#dee1e6]"
                }`}
              />
              <View
                className={`w-6 h-6 rounded-full ${
                  currentStep >= 5 ? "bg-[#ed7d2d]" : "bg-[#dee1e6]"
                }`}
              />
              <View
                className={`w-6 h-6 rounded-full ${
                  currentStep === 6 ? "bg-[#ed7d2d]" : "bg-[#dee1e6]"
                }`}
              />
            </View>
          </View>
        )}
        {content}
        {currentStep > 0 && (
          <View className="relative mb-10">
            <Image
              source={OrangeButtom}
              className=" w-[350px] h-[65px]"
              resizeMode="contain"
            />
            <TouchableOpacity
              className=" w-[350px] h-[65px] absolute top-[-5px] flex justify-center items-center"
              onPress={() => handleStepChange(1)}
            >
              <PText className="text-white text-xl font-bold">CONTINUE</PText>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

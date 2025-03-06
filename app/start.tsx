import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PText from "@/components/ui/ptext";

import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

import { headers } from "../constants/start";

import OrangeButton from "../assets/images/button-orange-1.png";
import WhiteButton from "../assets/images/button-white-1.png";
import Button from "@/components/button";

export default function Start() {
  const { loading, isLoggedIn } = useGlobalContext();
  const [formData, setFormData] = useState<{}>();
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
          source={OrangeButton}
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
          source={WhiteButton}
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

  if (currentStep > 1) {
    content = <View></View>;
  }

  if (currentStep === 1) {
    content = (
      <ScrollView contentContainerClassName="flex ">
        <View className="flex gap-10">
          <Button
            key={"p1-1"}
            className="flex-row gap-5 py-4 px-8 justify-start items-center"
            text="PNLE"
          >
            <Image
              source={icons.philippines}
              className="w-10 h-10 rounded-2xl  "
            />
          </Button>
          <View className="border border-1 border-[#dee1e6] mt-16 mb-12" />
          <View className="flex justify-center items-center gap-10 w-[350px]">
            <PText className="text-2xl text-[#9095a0]">Coming soon...</PText>
            <View className="flex gap-5">
              <Button
                key={"p1-2"}
                className="flex-row gap-5 py-4 px-8 justify-start items-center w-[350px] opacity-40"
                disabled={true}
                text="NCLEX - RN"
              >
                <Image
                  source={icons.america}
                  className="w-10 h-10 rounded-2xl  "
                />
              </Button>
              <Button
                key={"p1-3"}
                className="flex-row gap-5 py-4 px-8 justify-start items-center  w-[350px] opacity-40"
                disabled={true}
                text="NCLEX - PN"
              >
                <Image
                  source={icons.america}
                  className="w-10 h-10 rounded-2xl  "
                />
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  if (currentStep === 2) {
    content = (
      <ScrollView contentContainerClassName="flex h-full ">
        <View className="flex justify-center items-center  w-[350px]">
          <View className="flex gap-6">
            <Button
              key={"p2-1"}
              className="flex-row gap-5 py-4 px-8 justify-start items-center w-[350px]"
              text="Google Search"
            >
              <Image source={icons.google} className="w-8 h-8 rounded-2xl  " />
            </Button>
            <Button
              key={"p2-2"}
              className="flex-row gap-5 py-4 px-8 justify-start items-center  w-[350px]"
              text="Facebook"
            >
              <Image
                source={icons.facebook}
                className="w-8 h-8 rounded-2xl  "
              />
            </Button>
            <Button
              key={"p2-3"}
              className="flex-row gap-5 py-4 px-8 justify-start items-center  w-[350px]"
              text="Youtube"
            >
              <Image source={icons.youtube} className="w-8 h-8 rounded-2xl  " />
            </Button>
            <Button
              key={"p2-4"}
              className="flex-row gap-5 py-4 px-8 justify-start items-center  w-[350px]"
              text="Friends/family"
            >
              <Image source={icons.people} className="w-8 h-8 rounded-2xl  " />
            </Button>
            <Button
              key={"p2-5"}
              className="flex-row gap-5 py-4 px-8 justify-start items-center  w-[350px]"
              text="Others"
            >
              <Image source={icons.more} className="w-8 h-8 rounded-2xl  " />
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }

  if (currentStep === 3) {
    content = (
      <ScrollView contentContainerClassName="flex h-full ">
        <View className="flex justify-center items-center  w-[350px]">
          <View className="flex gap-6">
            <Button
              key={"p3-1"}
              className="flex-row gap-5 py-4 px-8 justify-start items-center w-[350px]"
              text="Freshman"
            >
              <Image source={icons.syringe} className="w-8 h-8   " />
            </Button>
            <Button
              key={"p3-2"}
              className="flex-row gap-5 py-4 px-8 justify-start items-center  w-[350px]"
              text="Sophomore"
            >
              <Image source={icons.nursecap} className="w-8 h-8   " />
            </Button>
            <Button
              key={"p3-3"}
              className="flex-row gap-5 py-4 px-8 justify-start items-center  w-[350px]"
              text="Junior"
            >
              <Image source={icons.stethoscope} className="w-8 h-8  " />
            </Button>
            <Button
              key={"p3-4"}
              className="flex-row gap-5 py-4 px-8 justify-start items-center  w-[350px]"
              text="Senior"
            >
              <Image source={icons.nurse} className="w-8 h-8 " />
            </Button>
            <Button
              key={"p3-5"}
              className="flex-row gap-5 py-4 px-8 justify-start items-center  w-[350px]"
              text="Recent Graduate"
            >
              <Image source={icons.note} className="w-8 h-8  " />
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }

  if (currentStep === 4) {
    content = (
      <ScrollView contentContainerClassName="flex h-full ">
        <View className="flex justify-center items-center  w-[350px]">
          <View className="flex gap-6">
            <Button
              key={"p4-1"}
              className="flex-row gap-5 py-6 px-8 justify-start items-center w-[350px]"
              text="Build foundational knowledge"
            ></Button>
            <Button
              key={"p4-2"}
              className="flex-row gap-5 py-6 px-8 justify-start items-center  w-[350px]"
              text="Strengthen clinical skills"
            ></Button>
            <Button
              key={"p4-3"}
              className="flex-row gap-5 py-6 px-8 justify-start items-center  w-[350px]"
              text="Prepare for PNLE"
            ></Button>
          </View>
        </View>
      </ScrollView>
    );
  }

  if (currentStep === 5) {
    content = (
      <ScrollView contentContainerClassName="flex h-full ">
        <View className="flex justify-center items-center  w-[350px]">
          <View className="flex gap-6">
            <Button
              key={"p5-1"}
              className="flex-row gap-5 py-6 px-8 justify-start items-center w-[350px]"
              text="3 min / day"
              subText="Casual"
            ></Button>
            <Button
              key={"p5-2"}
              className="flex-row gap-5 py-6 px-8 justify-start items-center  w-[350px]"
              text="10 min / day"
              subText="Regular"
            ></Button>
            <Button
              key={"p5-3"}
              className="flex-row gap-5 py-6 px-8 justify-start items-center  w-[350px]"
              text="15 min / day"
              subText="Serious"
            ></Button>
            <Button
              key={"p5-3"}
              className="flex-row gap-5 py-6 px-8 justify-start items-center  w-[350px]"
              text="30 min / day"
              subText="Intense"
            ></Button>
          </View>
        </View>
      </ScrollView>
    );
  }

  if (currentStep === 6) {
    content = (
      <ScrollView contentContainerClassName="flex h-full ">
        <View className="flex justify-center items-center  w-[350px]">
          <View className="flex gap-6">
            <Button
              key={"p6-1"}
              className="flex-row gap-5 py-6 px-8 justify-start items-center w-[350px]"
              text="Take the Assessment"
              description="Let's make a personalized learning for you"
              supText="RECOMMENDED"
            ></Button>
            <Button
              key={"p6-2"}
              className="flex-row gap-5 py-6 px-8 justify-start items-center w-[350px]"
              text="Start from scatch!"
              description="Good for people starting out."
            ></Button>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView className="flex justify-between items-center bg-white h-full">
      {currentStep > 0 && (
        <View>
          <View className="relative flex flex-row items-center justify-center w-[350px]">
            <TouchableOpacity
              onPress={() => handleStepChange(-1)}
              className="absolute w-6 h-6 left-0 top-4"
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
          <PText className="text-2xl w-[350px] mt-10 mb-16 ">
            {headers[currentStep - 1]?.header}
          </PText>
        </View>
      )}

      {content}
      {currentStep > 0 && (
        <View className="relative mb-10">
          <Image
            source={OrangeButton}
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
    </SafeAreaView>
  );
}

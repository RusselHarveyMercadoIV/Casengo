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
import {
  academicStatusesType,
  adNoticeType,
  comittmentsType,
  profilingDataType,
} from "./types/types";

const profilingData: profilingDataType = {
  countryExam: "",
  appNotice: "",
  academicStatus: "",
  goal: "",
  comittment: "",
  start: "",
};

export default function Start() {
  const { loading, isLoggedIn } = useGlobalContext();
  const [formData, setFormData] = useState<profilingDataType>(profilingData);
  const [currentStep, setCurrentStep] = useState<number>(0);

  if (!loading && isLoggedIn) return <Redirect href={"/"} />;

  const handleStepChange = (step: number) => {
    if (currentStep === 6 && step > 0) return;
    setCurrentStep((prevStep) => prevStep + step);
  };

  const handleDataChange = (
    type: keyof profilingDataType,
    value: profilingDataType[keyof profilingDataType]
  ) => {
    if (type === "academicStatus") {
      const isDisabled =
        !["Recent Graduate", "Senior"].includes(value) &&
        formData.goal === "Prepare for PNLE";
      if (isDisabled) {
        setFormData((prevData) => ({ ...prevData, goal: "" }));
      }
    }
    setFormData((prevData) => ({ ...prevData, [type]: value }));
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

  if (currentStep === 1) {
    const buttonCss =
      "flex-row gap-5 py-4 px-8 justify-start items-center w-[350px] ";

    const disabledCss = "opacity-40";

    const imgCss = "w-10 h-10 rounded-2xl  ";

    content = (
      <ScrollView contentContainerClassName="flex ">
        <View className="flex gap-10">
          <Button
            key={"p1-1"}
            className={buttonCss}
            text="PNLE"
            isHighlighted={formData.countryExam === "PNLE"}
            onPress={
              formData.countryExam === "PNLE"
                ? () => handleDataChange("countryExam", "")
                : () => handleDataChange("countryExam", "PNLE")
            }
          >
            <Image source={icons.philippines} className={imgCss} />
          </Button>
          <View className="border border-1 border-[#dee1e6] mt-16 mb-12" />
          <View className="flex justify-center items-center gap-10 w-[350px]">
            <PText className="text-2xl text-[#9095a0]">Coming soon...</PText>
            <View className="flex gap-5">
              <Button
                key={"p1-2"}
                className={buttonCss + disabledCss}
                disabled={true}
                text="NCLEX - RN"
                isHighlighted={formData.countryExam === "NCLEX-RN"}
                onPress={
                  formData.countryExam === "NCLEX-RN"
                    ? () => handleDataChange("countryExam", "")
                    : () => handleDataChange("countryExam", "NCLEX-RN")
                }
              >
                <Image source={icons.america} className={imgCss} />
              </Button>
              <Button
                key={"p1-3"}
                className={buttonCss + disabledCss}
                disabled={true}
                text="NCLEX - PN"
                isHighlighted={formData.countryExam === "NCLEX-PN"}
                onPress={
                  formData.countryExam === "NCLEX-PN"
                    ? () => handleDataChange("countryExam", "")
                    : () => handleDataChange("countryExam", "NCLEX-PN")
                }
              >
                <Image source={icons.america} className={imgCss} />
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  if (currentStep === 2) {
    const buttonCss =
      "flex-row gap-5 py-4 px-8 justify-start items-center w-[350px]";

    const imgCss = "w-8 h-8 rounded-2xl  ";

    const adNotice: adNoticeType = {
      "Google Search": icons.google,
      Facebook: icons.facebook,
      Youtube: icons.youtube,
      "Friends/family": icons.people,
      Others: icons.more,
    };

    content = (
      <ScrollView contentContainerClassName="flex h-full ">
        <View className="flex justify-center items-center  w-[350px]">
          <View className="flex gap-6">
            {(Object.keys(adNotice) as (keyof adNoticeType)[]).map(
              (choice: keyof adNoticeType) => (
                <Button
                  key={choice}
                  className={buttonCss}
                  text={choice}
                  isHighlighted={formData.appNotice === choice}
                  onPress={
                    formData.appNotice === choice
                      ? () => handleDataChange("appNotice", "")
                      : () => handleDataChange("appNotice", choice)
                  }
                >
                  <Image source={adNotice[choice]} className={imgCss} />
                </Button>
              )
            )}
          </View>
        </View>
      </ScrollView>
    );
  }

  if (currentStep === 3) {
    const buttonCss =
      "flex-row gap-5 py-4 px-8 justify-start items-center w-[350px]";

    const imgCss = "w-8 h-8   ";

    const academicStatuses: academicStatusesType = {
      Freshman: icons.syringe,
      Sophomore: icons.nursecap,
      Junior: icons.stethoscope,
      Senior: icons.nurse,
      "Recent Graduate": icons.note,
    };

    content = (
      <ScrollView contentContainerClassName="flex h-full ">
        <View className="flex justify-center items-center  w-[350px]">
          <View className="flex gap-6">
            {(
              Object.keys(academicStatuses) as (keyof academicStatusesType)[]
            ).map((choice: keyof academicStatusesType) => (
              <Button
                key={choice}
                className={buttonCss}
                text={choice}
                isHighlighted={formData.academicStatus === choice}
                onPress={
                  formData.academicStatus === choice
                    ? () => handleDataChange("academicStatus", "")
                    : () => handleDataChange("academicStatus", choice)
                }
              >
                <Image source={academicStatuses[choice]} className={imgCss} />
              </Button>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }

  if (currentStep === 4) {
    const buttonCss = `flex-row gap-5 py-6 px-8 justify-start items-center w-[350px]`;

    const goals = [
      "Build foundational knowledge",
      "Strengthen clinical skills",
      "Prepare for PNLE",
    ] as const;

    content = (
      <ScrollView contentContainerClassName="flex h-full ">
        <View className="flex justify-center items-center  w-[350px]">
          <View className="flex gap-6">
            {goals.map((goal) => {
              const isDisabled =
                !["Recent Graduate", "Senior"].includes(
                  formData.academicStatus
                ) && goal === "Prepare for PNLE";

              return (
                <Button
                  key={goal}
                  className={buttonCss}
                  text={goal}
                  isHighlighted={formData.goal === goal && !isDisabled}
                  disabled={isDisabled}
                  onPress={
                    formData.goal === goal
                      ? () => handleDataChange("goal", "")
                      : () => handleDataChange("goal", goal)
                  }
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }

  if (currentStep === 5) {
    const buttonCss =
      "flex-row gap-5 py-6 px-8 justify-start items-center w-[350px]";

    const comittments: comittmentsType = {
      "3 min / day": "Casual",
      "10 min / day": "Regular",
      "15 min / day": "Serious",
      "30 min / day": "Intense",
    };

    content = (
      <ScrollView contentContainerClassName="flex h-full ">
        <View className="flex justify-center items-center  w-[350px]">
          <View className="flex gap-6">
            {(Object.keys(comittments) as (keyof comittmentsType)[]).map(
              (comittment: keyof comittmentsType) => (
                <Button
                  key={comittment}
                  className={buttonCss}
                  text={comittment}
                  subText={comittments[comittment]}
                  isHighlighted={formData.comittment === comittment}
                  onPress={
                    formData.comittment === comittment
                      ? () => handleDataChange("comittment", "")
                      : () => handleDataChange("comittment", comittment)
                  }
                />
              )
            )}
          </View>
        </View>
      </ScrollView>
    );
  }

  if (currentStep === 6) {
    const buttonCss =
      "flex-row gap-5 py-6 px-8 justify-start items-center w-[350px]";

    content = (
      <ScrollView contentContainerClassName="flex h-full ">
        <View className="flex justify-center items-center  w-[350px]">
          <View className="flex gap-6">
            <Button
              key={"p6-1"}
              className={buttonCss}
              text="Take the Assessment"
              description="Let's make a personalized learning for you!"
              supText="RECOMMENDED"
              isHighlighted={formData.start === "personalized"}
              onPress={
                formData.start === "personalized"
                  ? () => handleDataChange("start", "")
                  : () => handleDataChange("start", "personalized")
              }
            />
            <Button
              key={"p6-2"}
              className={buttonCss}
              text="Start from scatch!"
              description="Good for people starting out."
              isHighlighted={formData.start === "scratch"}
              onPress={
                formData.start === "scratch"
                  ? () => handleDataChange("start", "")
                  : () => handleDataChange("start", "scratch")
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  const stepsForm = "w-6 h-6 rounded-full";
  const finishedStep = "bg-[#ed7d2d]";
  const unfinishedStep = "bg-[#dee1e6]";

  const steps = Object.keys(formData);
  const current = formData[steps[currentStep - 1] as keyof profilingDataType];
  const isContinue = current === "";

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
                className={`${stepsForm} ${
                  currentStep >= 1 ? finishedStep : unfinishedStep
                }`}
              />
              <View
                className={`${stepsForm} ${
                  currentStep >= 2 || formData.appNotice !== ""
                    ? finishedStep
                    : unfinishedStep
                }`}
              />
              <View
                className={`${stepsForm} ${
                  currentStep >= 3 || formData.academicStatus !== ""
                    ? finishedStep
                    : unfinishedStep
                }`}
              />
              <View
                className={`${stepsForm} ${
                  currentStep >= 4 || formData.goal !== ""
                    ? finishedStep
                    : unfinishedStep
                }`}
              />
              <View
                className={`${stepsForm} ${
                  currentStep >= 5 || formData.comittment !== ""
                    ? finishedStep
                    : unfinishedStep
                }`}
              />
              <View
                className={`${stepsForm} ${
                  currentStep === 6 || formData.start !== ""
                    ? finishedStep
                    : unfinishedStep
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
        <View className={`relative mb-10 ${isContinue && "opacity-40"}`}>
          <Image
            source={OrangeButton}
            className=" w-[350px] h-[65px]"
            resizeMode="contain"
          />
          <TouchableOpacity
            className=" w-[350px] h-[65px] absolute top-[-5px] flex justify-center items-center"
            onPress={() => handleStepChange(1)}
            disabled={current === ""}
          >
            <PText className="text-white text-xl font-bold">CONTINUE</PText>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

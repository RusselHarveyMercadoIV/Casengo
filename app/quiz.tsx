import PText from "@/components/ui/ptext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { QuizRouteProp, SubjectColorsType } from "./types/types";

import icons from "@/constants/icons";

export default function Quiz() {
  const navigation = useNavigation();
  const route = useRoute<QuizRouteProp>();
  const { questions, academicStatus } = route.params;

  const level = questions[academicStatus];

  return (
    <SafeAreaView className="flex items-center bg-white h-full pt-5">
      <View className=" flex w-[320px] flex-row justify-center items-center">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="absolute left-0 w-[22px] h-[22px]"
        >
          <Image source={icons.closebtn} className="w-full h-full" />
        </TouchableOpacity>
        <View className="flex flex-row gap-1 ">
          {Object.keys(level).map((subject) => {
            const SubjectColors: SubjectColorsType = {
              anatomyAndPhysiology: "#ed7d2d",
              microbiology: "#8353e2",
              fundamentalsOfNursing: "#1dd75b",
              pharmacology: "#676767",
              communityHealthNursing: "#379ae6",
              maternalAndChildHealthNursing: "#de3b40",
              medicalSurgicalNursing: "#00bdd6",
              psychiatricNursing: "#efb034",
            };

            const color = SubjectColors[subject as keyof SubjectColorsType];
            return (
              <View
                key={subject}
                className="w-[15px] h-[15px] rounded-full opacity-40"
                style={{ backgroundColor: color }}
              />
            );
          })}
        </View>
      </View>
      <View className="flex justify-center items-center border border-2 border-[#cfd2da] w-[350px] h-[670px] mt-7 mb-3 rounded-3xl">
        <View className="absolute top-1 right-1 bg-[#eefdf3] px-6 py-2 rounded-full">
          <PText className="text-[#117b34]">Easy</PText>
        </View>
        <View className="flex gap-6 h-[70%] px-8 pt-2">
          <PText className="text-3xl text-[#323842]">
            Which of the following apply to meiosis
          </PText>
          <PText className=" text-[#9095a0]">Select all that apply...</PText>
          <View></View>
        </View>
        <View className="flex gap-10 flex-row mb-10">
          <TouchableOpacity className=" px-5 py-6 rounded-2xl  bg-[#f3f4f6]">
            <PText className="text-xl text-[#565e6c]">I don't know</PText>
          </TouchableOpacity>
          <TouchableOpacity className="border border-1 border-[#ed7d2d] px-10 py-6 rounded-2xl">
            <PText className="text-xl text-[#ed7d2d]">Confirm</PText>
          </TouchableOpacity>
        </View>
        <PText className="text-[#bcc1ca]">Anatomy & Physiology</PText>
      </View>
      <View className="flex flex-row justify-around w-[350px] opacity-70">
        <TouchableOpacity className=" px-5 py-3 rounded-2xl  bg-[#ed7d2d]">
          <PText className="text-md text-white">Suggest</PText>
        </TouchableOpacity>
        <TouchableOpacity className=" px-5 py-3 rounded-2xl bg-[#171a1f] ">
          <PText className="text-md text-white">night/day</PText>
        </TouchableOpacity>
        <TouchableOpacity className=" px-5 py-3 rounded-2xl bg-[#171a1f]">
          <PText className="text-md text-white">Bug</PText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

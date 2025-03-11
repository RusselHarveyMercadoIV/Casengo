import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import PText from "@/components/ui/ptext";
import icons from "@/constants/icons";
import { SelectedQuestion, SubjectColorsType } from "./types/types";

const SHOWN_NODES = 15;

export default function Quiz() {
  const [items, setItems] = useState<SelectedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const navigation = useNavigation();
  const route = useRoute<any>(); // Assuming route params include questions and academicStatus
  const { questions, academicStatus } = route.params;

  const SubjectColors = {
    anatomyAndPhysiology: "#ed7d2d",
    microbiology: "#8353e2",
    fundamentalsOfNursing: "#1dd75b",
    pharmacology: "#676767",
    communityHealthNursing: "#379ae6",
    maternalAndChildHealthNursing: "#de3b40",
    medicalSurgicalNursing: "#00bdd6",
    psychiatricNursing: "#efb034",
  };

  useEffect(() => {
    const level = questions[academicStatus]; // e.g., questions["Freshman"]
    const allQuestions: SelectedQuestion[] = [];

    // Iterate through subjects (e.g., anatomyAndPhysiology, microbiology)
    Object.keys(level).forEach((subject) => {
      const sub = level[subject];
      // Iterate through difficulties (easy, medium, hard)
      Object.keys(sub).forEach((diff) => {
        const currentDifficulty = sub[diff];
        // Iterate through question types (multipleChoices, sequencing, etc.)
        Object.keys(currentDifficulty).forEach((category) => {
          const questionsArray = currentDifficulty[category];
          if (questionsArray && Array.isArray(questionsArray)) {
            questionsArray.forEach((question) => {
              // Convert choices object to array (e.g., ["To pump blood", "To exchange gases", ...])
              const choicesArray = Object.values(question.choices);
              allQuestions.push({
                id: question.id,
                question: question.question,
                choices: choicesArray as string[],
                answer: question.answer, // String or string[] based on type
                type: category as
                  | "multipleChoices"
                  | "sata"
                  | "caseBased"
                  | "sequencing",
                subject,
                difficulty: diff as "easy" | "medium" | "hard",
              });
            });
          }
        });
      });
    });

    // Shuffle and select 15 questions
    // const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    // const selected = shuffled.slice(0, 15);
    setItems(allQuestions);
  }, [questions, academicStatus]);

  const currentItem = items[currentIndex];

  return (
    <SafeAreaView className="flex items-center bg-white h-full pt-5">
      {/* Header */}
      <View className="flex w-[340px] flex-row justify-center items-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-0 w-[22px] h-[22px]"
        >
          <Image
            source={icons.closebtn}
            style={{ tintColor: "#323842" }}
            className="w-full h-full"
          />
        </TouchableOpacity>
        <View className="flex flex-row gap-1 items-center pl-10 border-r-[4px] border-[#ed7d2d] h-[20px] w-[300px] overflow-hidden">
          {items.map((item, index) => (
            <View
              key={index}
              className="w-[15px] h-[15px] rounded-full opacity-40"
              style={{
                backgroundColor:
                  SubjectColors[item.subject as keyof SubjectColorsType],
              }}
            />
          ))}
        </View>
        <PText className="text-sm text-[#ed7d2d]">
          +{items.length - SHOWN_NODES}
        </PText>
      </View>

      {/* Question Display */}
      {items.length > 0 && currentIndex < items.length && (
        <View className="flex justify-center items-center border border-2 border-[#cfd2da] w-[350px] h-[670px] mt-7 mb-3 rounded-3xl">
          <View className="absolute top-1 right-1 bg-[#eefdf3] px-6 py-2 rounded-full">
            <PText className="text-[#117b34]">{currentItem.difficulty}</PText>
          </View>
          <View className="flex gap-6 h-[70%] px-8 pt-2">
            <PText className="text-3xl text-[#323842]">
              {currentItem.question}
            </PText>
            <View className="flex gap-5 mt-3 ">
              {currentItem.type === "sequencing" ? (
                // Sequencing UI (placeholder)
                <View>
                  {currentItem.choices.map((choice, index) => (
                    <PText key={index} className="text-lg text-[#565e6c] p-2">
                      {choice}
                    </PText>
                  ))}
                  <PText className="text-sm text-gray-500 mt-2">
                    (Arrange these steps in the correct order)
                  </PText>
                </View>
              ) : (
                // Multiple-choice or case-based UI
                currentItem.choices.map((choice, index) => (
                  <TouchableOpacity
                    key={index}
                    className="bg-[#f3f4f6] py-6 px-4 rounded-xl"
                  >
                    <PText className="text-lg text-center text-[#565e6c]">
                      {choice}
                    </PText>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </View>
          <View className="flex justify-end items-center h-[20%]">
            <View className="flex gap-10 flex-row mb-10">
              <TouchableOpacity className="px-5 py-6 rounded-2xl bg-[#f3f4f6]">
                <PText className="text-xl text-[#565e6c]">I don't know</PText>
              </TouchableOpacity>
              <TouchableOpacity
                className={`border border-1 border-[#ed7d2d] px-10 py-6 rounded-2xl ${
                  currentItem.type === "multipleChoices" && "opacity-30"
                }`}
                disabled={currentItem.type === "multipleChoices"}
              >
                <PText className="text-xl text-[#ed7d2d]">Confirm</PText>
              </TouchableOpacity>
            </View>
            <PText className="text-[#bcc1ca]">{currentItem.subject}</PText>
          </View>
        </View>
      )}

      {/* Footer */}
      <View className="flex flex-row justify-around w-[350px] opacity-70">
        <TouchableOpacity className="px-5 py-3 rounded-2xl bg-[#ed7d2d]">
          <PText className="text-md text-white">Suggest</PText>
        </TouchableOpacity>
        <TouchableOpacity className="px-5 py-3 rounded-2xl bg-[#171a1f]">
          <PText className="text-md text-white">night/day</PText>
        </TouchableOpacity>
        <TouchableOpacity className="px-5 py-3 rounded-2xl bg-[#171a1f]">
          <PText className="text-md text-white">Bug</PText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

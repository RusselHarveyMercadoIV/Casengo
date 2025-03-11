import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import PText from "@/components/ui/ptext";
import icons from "@/constants/icons";
import { SelectedQuestion, SubjectColorsType } from "./types/types";
import Button from "@/components/button";

const SHOWN_NODES = 15;

export default function Quiz() {
  const [items, setItems] = useState<SelectedQuestion[]>([]);

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

  const SubjectTitle = {
    anatomyAndPhysiology: "Anamoty & Physiology",
    microbiology: "Microbiology",
    fundamentalsOfNursing: "Fundamentals of Nursing",
    pharmacology: "Pharmacology",
    communityHealthNursing: "Community Health Nursing",
    maternalAndChildHealthNursing: "Maternal & Child Health Nursing",
    medicalSurgicalNursing: "Medical Surgical Nursing",
    psychiatricNursing: "Psychiatric Nursing",
  };

  const handleFinishQuestion = () => {
    setItems((prevItems) => prevItems.slice(1));
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

  const currentItem = items[0];
  const total = items.length - SHOWN_NODES;

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
        {/* nodes */}
        <View className="w-[270px] ml-10 h-[20px]">
          <Image
            className={"w-[10px] h-[10px] left-[2px] top-[22px] absolute"}
            source={icons.cursor}
          />
          <View
            className={`flex flex-row gap-1 items-center  ${
              total > 0 && "border-r-[4px] border-[#ed7d2d]"
            }  h-full w-full overflow-hidden`}
          >
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
        </View>

        {total > 0 && (
          <PText className="text-sm text-[#ed7d2d]"> +{total}</PText>
        )}
      </View>

      {/* Question Display */}
      {items.length > 0 && (
        <View className="flex justify-between py-8 items-center border border-2 border-[#cfd2da] w-[350px] h-[670px] mt-7 mb-3 rounded-3xl">
          <View className="flex h-[80%] gap-10 px-8">
            <PText className="text-2xl text-[#323842]">
              {currentItem.question}
            </PText>
            <ScrollView>
              <View className="flex gap-5 mt-3 w-[290px]">
                {currentItem.type === "sequencing" ? (
                  // Sequencing UI
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
                    <Button
                      key={index}
                      className="py-6 px-4 rounded-xl w-full"
                      onPress={handleFinishQuestion}
                    >
                      <PText className="text-lg text-center text-[#565e6c]">
                        {choice}
                      </PText>
                    </Button>
                  ))
                )}
              </View>
            </ScrollView>
          </View>
          <View className="flex justify-end items-center">
            {currentItem.type !== "multipleChoices" && (
              <View className="flex gap-10 flex-row mb-10">
                <TouchableOpacity
                  className="px-6 py-5 rounded-2xl bg-[#f3f4f6]"
                  onPress={handleFinishQuestion}
                >
                  <PText className="text-xl text-[#565e6c]">I don't know</PText>
                </TouchableOpacity>
                <TouchableOpacity
                  className="border border-1 border-[#ed7d2d] px-6 py-5 rounded-2xl"
                  onPress={handleFinishQuestion}
                >
                  <PText className="text-xl text-[#ed7d2d]">Confirm</PText>
                </TouchableOpacity>
              </View>
            )}
            <PText className="text-[#bcc1ca]">
              {SubjectTitle[currentItem.subject as keyof SubjectColorsType]}
            </PText>
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

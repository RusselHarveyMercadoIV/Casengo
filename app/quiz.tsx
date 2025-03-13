import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import PText from "@/components/ui/ptext";
import icons from "@/constants/icons";
import { SelectedQuestion, SubjectColorsType } from "./types/types";
import Button from "@/components/button";
// Import DraxList from react-native-drax
import { DraxList, DraxScrollView } from "react-native-drax";

const SHOWN_NODES = 17;

// Define a type for sequence items used in DraxList
type SequenceItem = {
  id: string;
  text: string;
};

export default function Quiz() {
  const [items, setItems] = useState<SelectedQuestion[]>([]);
  // Add state to manage the current order of sequencing choices
  const [sequenceOrder, setSequenceOrder] = useState<SequenceItem[]>([]);

  const navigation = useNavigation();
  const route = useRoute<any>();
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

  const QuestionType = {
    multipleChoices: "Multiple choices",
    caseBased: "Case based",
    sata: "SATA",
    sequencing: "Sequencing",
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

  // Add a handler for the Confirm button to check the sequence
  const handleConfirm = () => {
    if (currentItem.type === "sequencing") {
      const currentTexts = sequenceOrder.map((item) => item.text);
      const isCorrect =
        JSON.stringify(currentTexts) === JSON.stringify(currentItem.answer);
      console.log(isCorrect ? "Correct" : "Incorrect"); // Replace with your scoring logic
    }
    handleFinishQuestion();
  };

  useEffect(() => {
    const level = questions[academicStatus];
    const allQuestions: SelectedQuestion[] = [];

    Object.keys(level).forEach((subject) => {
      const sub = level[subject];
      Object.keys(sub).forEach((diff) => {
        const currentDifficulty = sub[diff];
        Object.keys(currentDifficulty).forEach((category) => {
          const questionsArray = currentDifficulty[category];
          if (questionsArray && Array.isArray(questionsArray)) {
            questionsArray.forEach((question) => {
              const choicesArray = Object.values(question.choices);
              allQuestions.push({
                id: question.id,
                question: question.question,
                choices: choicesArray as string[],
                answer: question.answer,
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

    setItems(allQuestions);
  }, [questions, academicStatus]);
  const currentItem = items[0];

  // Initialize sequenceOrder when a new sequencing question is displayed
  useEffect(() => {
    if (currentItem && currentItem.type === "sequencing") {
      const initialSequence = currentItem.choices.map((choice, index) => ({
        id: `${currentItem.id}-${index}`, // Unique ID for DraxList
        text: choice,
      }));
      setSequenceOrder(initialSequence);
    }
  }, [currentItem]);

  const total = items.length - SHOWN_NODES;

  return (
    <SafeAreaView className="flex items-center bg-white h-full pt-5">
      {/* Header */}
      <View className="flex w-[340px] flex-row justify-center items-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-0 w-[20px] h-[20px]"
        >
          <Image
            source={icons.closebtn}
            style={{ tintColor: "#323842" }}
            className="w-full h-full"
          />
        </TouchableOpacity>
        <View className="w-[270px] ml-10 h-[20px]">
          <Image
            className={"w-[10px] h-[10px] left-[1.5px] top-[22px] absolute"}
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
                className="w-[12px] h-[12px] rounded-full opacity-50"
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
        <View className="flex bg-white justify-between py-8 border-x-2 border-[#dee1e6] items-center w-[370px] h-[665px] mt-7 mb-3 rounded-lg">
          <View className={`flex flex-1 px-8`}>
            <PText className="text-2xl pb-4 text-[#323842]">
              {currentItem.question}
            </PText>
            <ScrollView
              className="flex-1"
              contentContainerClassName="flex h-[420px] w-full items-center justify-center "
            >
              <View className="flex gap-5 w-[300px] ">
                {currentItem.type === "sequencing" ? (
                  // Replace static text with DraxList for drag-and-drop
                  <View>
                    <DraxList
                      data={sequenceOrder}
                      renderItemContent={({ item }) => (
                        <View
                          style={{
                            padding: 10,
                            backgroundColor: "#f0f0f0",
                            marginVertical: 5,
                            borderRadius: 8,
                          }}
                        >
                          {/* Replace PText with native Text if the issue persists */}
                          <Text style={{ fontSize: 18, color: "#565e6c" }}>
                            {item.text}
                          </Text>
                          {/* Or ensure PText uses forwardRef as shown earlier */}
                          {/* <PText className="text-lg text-[#565e6c]">{item.text}</PText> */}
                        </View>
                      )}
                      onItemReorder={({ from, to }) => {
                        const newSequence = [...sequenceOrder];
                        const [movedItem] = newSequence.splice(from, 1);
                        newSequence.splice(to, 0, movedItem);
                        setSequenceOrder(newSequence);
                      }}
                      keyExtractor={(item) => item.id}
                    />
                    <PText className="text-sm text-gray-500 mt-2">
                      (Arrange these steps in the correct order)
                    </PText>
                  </View>
                ) : (
                  // Multiple-choice or case-based UI remains unchanged
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
          <View className="flex items-center w-[300px] flex-none pt-4 ">
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
                  onPress={handleConfirm} // Use handleConfirm instead of handleFinishQuestion
                >
                  <PText className="text-xl text-[#ed7d2d]">Confirm</PText>
                </TouchableOpacity>
              </View>
            )}
            <View className="w-full flex flex-row justify-between items-center border-t border-[#bcc1ca] pt-2">
              <PText className="text-[#bcc1ca] text-sm">
                {QuestionType[currentItem.type]}
              </PText>
              <PText className=" text-[#bcc1ca] text-sm">
                {SubjectTitle[currentItem.subject as keyof SubjectColorsType]}
              </PText>
            </View>
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
          <PText className="text-md text-white">Report</PText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

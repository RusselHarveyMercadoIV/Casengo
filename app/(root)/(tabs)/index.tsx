import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import PText from "../../../components/ui/ptext";
import icons from "@/constants/icons";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { SafeAreaView } from "react-native-safe-area-context";
import { topics } from "@/constants/topics";
import { curatedLearnings } from "@/constants/curated-learnings";

export default function Index() {
  // State for modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user, refetch } = useGlobalContext();

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result) {
        setIsModalVisible(false);
        Alert.alert("Successfully logged out.");
        refetch();
      }
    } catch (error) {
      Alert.alert("There's a problem signing out.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header Section */}
      <View className="flex-row justify-between items-center px-8 py-4">
        {/* Streak Counter */}
        <View className="flex-row items-center">
          <Image
            source={icons.flame}
            className="w-7 h-7"
            resizeMode="contain"
          />
          <PText className="text-lg text-[#ed7d2d] font-bold ml-1">7</PText>
        </View>
        {/* More Button */}
        <Pressable
          onPress={() => setIsModalVisible(true)}
          accessibilityLabel="More options"
        >
          <Image source={icons.more} className="w-7 h-7" resizeMode="contain" />
        </Pressable>
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Content */}
        <View className="flex-col gap-10 w-full items-center mt-5">
          <PText className="text-xl text-center">
            Welcome back, Student nurse!
          </PText>
          <TouchableOpacity
            className="w-[300px] border border-[#ed7d2d] border-[3px] rounded-xl py-5 flex-row gap-2 items-center px-5 bg-[#fff3ea]"
            accessibilityLabel="Start Smart Session"
          >
            <Image
              source={icons.electric}
              className="w-12 h-12"
              resizeMode="contain"
            />
            <PText className="text-2xl text-[#ed7d2d]">Smart Session</PText>
          </TouchableOpacity>
        </View>

        {/* Topics Section */}
        <View className="w-full gap-5 px-8 mt-10">
          <PText className="text-lg text-[#323842]">Topics</PText>
          <View className="flex-row flex-wrap gap-5 justify-between">
            {topics.map((topic) => (
              <View
                key={topic.id}
                className="flex-row gap-2 justify-center items-center w-[100px] h-[100px] border border-[#9095a0] rounded-xl p-2"
              >
                {/* Uncomment and use topic.icon if available */}
                {/* <Image source={topic.icon} className="w-7 h-7" resizeMode="contain" /> */}
                <PText>{topic.title}</PText>
              </View>
            ))}
          </View>
        </View>

        {/* Curated Learnings Section */}
        <View className="w-full gap-5 px-8 mt-10 mb-32">
          <PText className="text-lg text-[#323842]">Curated Learnings</PText>
          <View className="flex-row flex-wrap gap-5 justify-between">
            {curatedLearnings.map((item) => (
              <View
                key={item.id}
                className="flex-col gap-2 justify-around items-center w-[160px] h-[200px] border border-[#9095a0] rounded-xl p-2"
              >
                <PText className="text-[#ed7d2d] text-3xl font-bold">
                  {item.title}
                </PText>
                <PText className="text-[#ed7d2d] text-xl font-bold">
                  Course
                </PText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Navigation Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50"
          onPress={() => setIsModalVisible(false)}
        >
          <View className="absolute top-12 right-4 w-48 bg-white rounded-xl p-4 flex-col items-center gap-4">
            {/* User Info */}
            <View className="flex-col items-center gap-2">
              <Image
                source={{ uri: user?.avatar }}
                className="w-10 h-10 rounded-full"
                resizeMode="cover"
              />
              <PText className="text-sm">{user?.name}</PText>
            </View>
            <View className="w-full border-b border-slate-200" />
            {/* Menu Items */}
            <View className="w-full">
              <Link href="/profile">
                <PText className="text-lg p-2 border-b border-[#ccc]">
                  Profile
                </PText>
              </Link>
              <Link href="/settings">
                <PText className="text-lg p-2 border-b border-[#ccc]">
                  Settings
                </PText>
              </Link>
            </View>
            {/* Sign Out Button */}
            <TouchableOpacity
              onPress={handleLogout}
              className="w-full bg-red-500 rounded-lg p-2"
            >
              <PText className="text-white text-lg text-center">Sign out</PText>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

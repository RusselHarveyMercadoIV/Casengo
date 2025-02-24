import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import PText from "../../../components/ui/ptext";
import icons from "@/constants/icons";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { SafeAreaView } from "react-native-safe-area-context";
import { topics } from "@/constants/topics";

// Define styles for the menu items
const styles = StyleSheet.create({
  menuItemText: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  signoutText: {
    padding: 10,
  },
});

export default function Index() {
  // State to control modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result) {
        setIsModalVisible(false);
        Alert.alert("Successfully logged out.");
        refetch();
      }
    } catch (error) {
      Alert.alert("There's a problem signout out.");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {/* More button */}
      <Pressable
        onPress={() => setIsModalVisible(true)}
        // style={{ position: "absolute", top: 16, right: 32 }}
        className="absolute top-4 right-8"
      >
        <Image source={icons.more} style={{ width: 28, height: 28 }} />
      </Pressable>

      {/* Modal for navigation menu */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        {/* Background overlay */}
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          onPress={() => setIsModalVisible(false)}
        >
          {/* Menu container */}
          <View
            // style={{
            //   position: "absolute",
            //   top: 48, // Position below the more button
            //   right: 16,
            //   backgroundColor: "white",
            //   borderRadius: 5,
            //   padding: 8,
            //   width: 150,
            // }}
            className="absolute top-12 right-8 p-10 w-[200px]  bg-white rounded-xl flex justify-around items-center gap-5 "
          >
            <View className="flex flex-col gap-2 justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="size-10 relative rounded-full"
              />
              <PText className="text-xs">{user?.name}</PText>
            </View>
            <View className="w-full border border-slate-100" />

            {/* Profile link */}
            <View className="flex gap-5 justify-center items-center">
              <Link href="/profile">
                <PText style={styles.menuItemText} className="text-lg">
                  Profile
                </PText>
              </Link>

              {/* Settings link */}
              <Link href="/settings">
                <PText style={styles.menuItemText} className="text-lg">
                  Settings
                </PText>
              </Link>
            </View>

            {/* Sign out button */}
            <TouchableOpacity
              onPress={handleLogout}
              className="rounded-lg bg-red-500"
            >
              <PText style={styles.signoutText} className="text-white text-lg">
                Sign out
              </PText>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* main content */}
      <View className="absolute top-20 flex flex-col gap-10 w-[300px] justify-center">
        <PText className="text-xl  text-center">
          Welcome back, Student nurse!
        </PText>
        <TouchableOpacity className="border border-[#ed7d2d] border-[3px] rounded-xl py-[24px] flex flex-row gap-2 items-center px-[20px] bg-[#fff3ea]">
          <Image source={icons.electric} className="w-[48px] h-[48px]" />
          <PText className="text-[24px] text-[#ed7d2d]">Smart Session</PText>
        </TouchableOpacity>
      </View>

      <View className="absolute top-4 left-8 flex flex-row gap-1 items-center">
        <Image source={icons.flame} className="w-[28px] h-[28px]" />
        <PText className="text-lg text-[#ed7d2d] font-bold">7</PText>
      </View>

      {/* Topics */}
      <View className="flex w-full gap-5 px-8">
        <PText>Topics</PText>
        <View className="flex flex-row flex-wrap gap-5 justify-between">
          {topics.map((topic) => {
            return (
              <View
                key={topic.id}
                className="flex flex-row gap-2 justify-center items-center w-[100px] h-[100px] border border-[#9095a0] border-[1px] rounded-xl p-2"
              >
                {/* <Image source={topic.icon} className="w-[28px] h-[28px]" /> */}
                <PText>{topic.title}</PText>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import PText from "@/components/ui/ptext";

import icons from "@/constants/icons";

const TabIcon = ({
  focused,
  icon,
}: //   title,
{
  focused: boolean;
  icon: any;
  //   title: string;
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#ed7d2d" : "#9095a0"}
      resizeMode="contain"
      className="size-9"
    />
    {/* <PText
      className={`${
        focused ? "text-[#ed7d2d]" : "text-[#9095a0]"
      } text-xs w-full text-center mt-1`}
    >
      {title}
    </PText> */}
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.home}
              focused={focused}
              //  title="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="weekly-challenge"
        options={{
          title: "Challenge",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.challenge}
              focused={focused}
              //   title="Challenge"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.trophy}
              focused={focused}
              //   title="Leaderboard"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

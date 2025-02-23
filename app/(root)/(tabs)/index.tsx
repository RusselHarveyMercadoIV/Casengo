import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import PText from "../../../components/ui/ptext";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="bg-white"
    >
      <PText className="text-2xl">Welcome back, Student nurse!</PText>
      <Link href={"/sign-in"}> Sign In</Link>
    </View>
  );
}

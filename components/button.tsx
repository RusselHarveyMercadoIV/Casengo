import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import PText from "./ui/ptext";

type ButtonTypes = {
  className: string;
  text: string;
  description?: string;
  subText?: string;
  supText?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  isHighlighted?: boolean;
  handlePress?: () => void;
  onPress?: () => void;
};

export default function Button({
  className,
  text,
  description,
  subText,
  supText,
  children,
  disabled = false,
  isHighlighted,
  onPress,
}: ButtonTypes) {
  const shadowColor = isHighlighted ? "#ed7d2d" : "#323842";

  return (
    <View className="relative">
      <TouchableOpacity
        className={`border  rounded-xl ${
          isHighlighted ? "border-[#ed7d2d] bg-[#fff3ea]" : "border-[#dee1e6]"
        }  border-2  flex  ${className}`}
        disabled={disabled}
        onPress={onPress}
      >
        {supText && (
          <PText className="absolute  top-0 right-0 bg-[#1ac052] text-white py-2 px-3 rounded-lg">
            {supText}
          </PText>
        )}
        {children}
        <View className="flex gap-5">
          <PText
            className={`text-xl  line-30 font-[ABeeZee] ${
              isHighlighted ? "text-[#ed7d2d]" : "text-[#323842]"
            }`}
            style={{
              textShadowColor: shadowColor,
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 1,
            }}
          >
            {text}
          </PText>
          {description && (
            <PText
              className={` ${
                isHighlighted ? "text-[#ed7d2d]" : "text-[#9095a0]"
              } `}
            >
              {description}
            </PText>
          )}
        </View>

        {subText && (
          <PText
            className={`absolute right-6 ${
              isHighlighted ? "text-[#ed7d2d]" : "text-[#dee1e6]"
            } `}
          >
            {subText}
          </PText>
        )}
      </TouchableOpacity>
    </View>
  );
}

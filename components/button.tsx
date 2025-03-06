import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import PText from "./ui/ptext";

type ButtonTypes = {
  className: string;
  text: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

export default function Button({
  className,
  text,
  children,
  disabled = false,
  ...props
}: ButtonTypes) {
  const [isPressed, setIsPressed] = useState<Boolean>(false);

  const handleButtonPressed = () => {
    setIsPressed((prevState) => !prevState);
  };

  const shadowColor = isPressed ? "#ed7d2d" : "#323842";

  return (
    <View className="relative">
      <TouchableOpacity
        className={`border  rounded-xl ${
          isPressed ? "border-[#ed7d2d] bg-[#fff3ea]" : "border-[#dee1e6]"
        }  border-2  flex  ${className}`}
        onPress={handleButtonPressed}
        disabled={disabled}
        {...props}
      >
        {children}
        <PText
          className={`text-xl  line-30 font-[ABeeZee] ${
            isPressed ? "text-[#ed7d2d]" : "text-[#323842]"
          }`}
          style={{
            textShadowColor: shadowColor,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 1,
          }}
        >
          {text}
        </PText>
      </TouchableOpacity>
    </View>
  );
}

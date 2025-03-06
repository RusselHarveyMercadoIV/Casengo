import { Image, TouchableOpacity, View } from "react-native";
import OrangeButton from "../assets/images/button-orange-1.png";
import WhiteButton from "../assets/images/button-white-1.png";

type ButtonVariants = "white" | "orange";

type ButtonTypes = {
  variant: ButtonVariants;
  height?: number;
  width?: number;
  children?: React.ReactNode;
};

export default function Button({
  variant,
  height,
  width,
  children,
  ...props
}: ButtonTypes) {
  const buttonVariant = variant === "white" ? WhiteButton : OrangeButton;

  const buttonHeight = height ?? 65;
  const buttonWidth = width ?? 350;

  return (
    <View className="relative mb-10">
      <Image
        source={buttonVariant}
        className={`h-[${buttonHeight}px] w-[${buttonWidth}px]`}
        resizeMode="contain"
      />
      <TouchableOpacity
        className={`absolute top-[-2] flex justify-center items-center h-[${buttonHeight}px] w-[${buttonWidth}px]`}
        {...props}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
}

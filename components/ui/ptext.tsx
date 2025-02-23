import { Text, TextProps } from "react-native";
import React from "react";

interface PTextProps extends TextProps {
  children: React.ReactNode;
}

const PText = ({ children, ...props }: PTextProps) => {
  return (
    <Text {...props} style={[{ fontFamily: "ABeeZee-Regular" }, props.style]}>
      {children}
    </Text>
  );
};

export default PText;

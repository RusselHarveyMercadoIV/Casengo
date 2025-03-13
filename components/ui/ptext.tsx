import { Text, TextProps } from "react-native";
import React, { forwardRef } from "react";

interface PTextProps extends TextProps {
  children: React.ReactNode;
}

// Use forwardRef to pass the ref to the Text component
const PText = forwardRef<Text, PTextProps>(({ children, ...props }, ref) => {
  return (
    <Text
      ref={ref} // Forward the ref here
      {...props}
      style={[{ fontFamily: "ABeeZee-Regular" }, props.style]}
    >
      {children}
    </Text>
  );
});

export default PText;

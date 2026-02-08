// core dependencies
import React from "react";
import Animated from "react-native-reanimated";
import { TextInput } from "react-native";

interface HeartTextProps {
  animatedTextProps: object;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
export const HeartText = ({ animatedTextProps }: HeartTextProps) => {
  return (
    <AnimatedTextInput
      editable={false}
      underlineColorAndroid="transparent"
      style={{ color: "#818cf8", fontSize: 16, fontWeight: "bold" }}
      animatedProps={animatedTextProps}
      // Set an initial value so it's not blank for the first millisecond
      defaultValue="0%"
    />
  );
};

// core dependencies
import React from "react";
import Svg, { Defs, ClipPath, Rect, Path } from "react-native-svg";

// constants
import { HEART_PATH } from "@/src/constants/loaders";

export const HeartOutline = () => {
  return (
    <Path
      d={HEART_PATH}
      fill="none"
      stroke="rgba(129, 140, 248, 0.3)"
      strokeWidth={1}
    />
  );
};

export const HeartFill = () => {
  return <Path d={HEART_PATH} fill="rgba(129, 140, 248, 1)" clipPath="url(#clip)" />;
};

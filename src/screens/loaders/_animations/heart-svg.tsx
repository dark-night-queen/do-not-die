// core dependencies
import React from "react";
import Svg, { Defs, ClipPath, Rect, Path } from "react-native-svg";
import Animated from "react-native-reanimated";

// constants
import { HEART_PATH } from "@/src/constants/loaders";

interface HeartSVGProps {
  animatedProps: Partial<{
    y: number;
  }>;
}

const AnimatedRect = Animated.createAnimatedComponent(Rect);
export default function HeartSVG({ animatedProps }: Readonly<HeartSVGProps>) {
  return (
    <Svg width={100} height={100} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="clip">
          <AnimatedRect x="0" width="24" height="24" animatedProps={animatedProps} />
        </ClipPath>
      </Defs>

      <HeartOutline />
      <HeartFilled />
    </Svg>
  );
}

function HeartOutline() {
  return (
    <Path
      d={HEART_PATH}
      fill="none"
      stroke="rgba(129, 140, 248, 0.3)"
      strokeWidth={1}
    />
  );
}

function HeartFilled() {
  return <Path d={HEART_PATH} fill="rgba(129, 140, 248, 1)" clipPath="url(#clip)" />;
}

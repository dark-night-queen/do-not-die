// core dependencies
import React, { useEffect } from "react";
import Svg, { Defs, ClipPath, Rect, Path } from "react-native-svg";
import { MotiView, MotiText } from "moti";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

// core components
import { Text } from "@/components/ui/text";
import DefaultLayout from "@/src/screens/_layout";

// constants
import { HEART_PATH } from "@/src/constants/loaders";
import { TextInput } from "react-native";

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const LoaderScreen = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1000 });
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return {
      // Moves the clipping rectangle from y=24 (empty) to y=0 (full)
      y: 24 - 24 * progress.value,
    };
  });

  const progressText = useDerivedValue(() => {
    return `${Math.round(progress.value * 100)}%`;
  });

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: progressText.value,
    } as any; // Cast to any to avoid TS prop-type conflicts with TextInput
  });

  return (
    <DefaultLayout className="justify-center items-center">
      <MotiView
        from={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="items-center mb-6"
      >
        <Svg width={100} height={100} viewBox="0 0 24 24">
          <Defs>
            <ClipPath id="clip">
              {/* This Rect is now animated natively */}
              <AnimatedRect
                x="0"
                width="24"
                height="24"
                animatedProps={animatedProps}
              />
            </ClipPath>
          </Defs>

          {/* Heart Outline */}
          <Path
            d={HEART_PATH}
            fill="none"
            stroke="rgba(129, 140, 248, 0.3)"
            strokeWidth={1}
          />

          {/* Filled Heart (clipped) */}
          <Path
            d={HEART_PATH}
            fill="rgba(129, 140, 248, 1)"
            clipPath="url(#clip)"
          />
        </Svg>
        <AnimatedTextInput
          editable={false}
          underlineColorAndroid="transparent"
          style={{ color: "#818cf8", fontSize: 16, fontWeight: "bold" }}
          animatedProps={animatedTextProps}
          // Set an initial value so it's not blank for the first millisecond
          defaultValue="0%"
        />
      </MotiView>

      <MotiText
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 400 }}
        className="text-white text-3xl font-bold"
      >
        Don&apos;t Die
      </MotiText>
      <Text className="text-sm text-indigo-400">
        Loading your health data...
      </Text>
    </DefaultLayout>
  );
};

export default LoaderScreen;

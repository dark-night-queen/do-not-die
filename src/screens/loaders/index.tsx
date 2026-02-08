// core dependencies
import React, { useEffect } from "react";
import { MotiView, MotiText } from "moti";
import {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

// core components
import { Text } from "@/components/ui/text";
import DefaultLayout from "@/src/screens/_layout";
import HeartSVG from "./_animations/heart-svg";
import HeartText from "./_animations/heart-text";

export default function LoaderScreen() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1000 });
  }, [progress]);

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
    <DefaultLayout className="items-center justify-center">
      <MotiView
        from={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-6 items-center"
      >
        <HeartSVG animatedProps={animatedProps} />
        <HeartText animatedTextProps={animatedTextProps} />
      </MotiView>

      <MotiText
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 400 }}
        className="text-3xl font-bold text-white"
      >
        Don&apos;t Die
      </MotiText>

      <Text className="text-sm text-indigo-400">Loading your health data...</Text>
    </DefaultLayout>
  );
}

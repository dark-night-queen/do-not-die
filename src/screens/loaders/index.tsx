// core dependencies
import React, { useEffect, useState } from "react";
import Svg, { Defs, ClipPath, Rect, Path } from "react-native-svg";
import { MotiView, MotiText } from "moti";

// core components
import { Button, ButtonText, Text } from "@/components/ui";
import DefaultLayout from "@/screens/_layout";

// constants
import { HEART_PATH } from "@/constants/loaders";
import { useRouter } from "expo-router";

// component logic
const LoaderScreen = () => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.02;
        if (next >= 1) clearInterval(interval);
        return next >= 1 ? 1 : next;
      });
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const onClick = () => {
    router.replace("/(tabs)");
  };

  return (
    <DefaultLayout className="justify-center items-center">
      <MotiView
        from={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "timing", duration: 500 }}
        className="items-center mb-6"
      >
        <Svg width={100} height={100} viewBox="0 0 24 24">
          <Defs>
            <ClipPath id="clip">
              <Rect x="0" y={24 - 24 * progress} width="24" height="24" />
            </ClipPath>
          </Defs>

          {/* Outline Heart */}
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
        <Text className="text-indigo-400">{Math.round(progress * 100)}%</Text>
      </MotiView>

      <MotiText
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 400 }}
        className="text-white text-3xl font-bold"
      >
        Don&apos;t Die
      </MotiText>
      <Text className="text-sm text-gray-400">Loading your health data...</Text>

      <Button onPress={onClick}>
        <ButtonText>Click</ButtonText>
      </Button>
    </DefaultLayout>
  );
};

export default LoaderScreen;

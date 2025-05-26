import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Box } from "@/components/ui";
import { CaptureUserGoals } from "./_components/capture-user-goals";
import { GoBack } from "./_components/go-back";

export default () => {
  const router = useRouter();
  const navigate = useNavigation();

  const goBack = () => {
    navigate.canGoBack()
      ? navigate.goBack()
      : router.push("/(auth)/onboarding");
  };

  return (
    <SafeAreaView>
      <Box variant="screen">
        <GoBack goBack={goBack} />
        <CaptureUserGoals />
      </Box>
    </SafeAreaView>
  );
};

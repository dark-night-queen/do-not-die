import React from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Box } from "@/components/ui";
import { ForgetPassword } from "./_components/forget-password";

export default () => {
  const router = useRouter();

  const handleSubmit = () => {};

  const goBackToLogin = () => {
    router.push("/(auth)");
  };

  return (
    <SafeAreaView>
      <Box variant="screen">
        <ForgetPassword
          handleSubmit={handleSubmit}
          goBackToLogin={goBackToLogin}
        />
      </Box>
    </SafeAreaView>
  );
};

import React from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { baseUrl } from "@/constants/index";
import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/utils/supabase";
import { Box } from "@/components/ui";
import { ForgetPassword } from "./_components/forget-password";

export default () => {
  const router = useRouter();
  const { setShowLoader } = useAuthStore();

  const handleSubmit = async (email: string) => {
    setShowLoader("forget-password", true);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/reset-password`,
    });
    setShowLoader("forget-password", false);
  };

  const goBackToLogin = () => {
    router.push("/(auth)");
  };

  return (
    <SafeAreaView className="flex-1">
      <Box variant="screen">
        <ForgetPassword
          handleSubmit={handleSubmit}
          goBackToLogin={goBackToLogin}
        />
      </Box>
    </SafeAreaView>
  );
};

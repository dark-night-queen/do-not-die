// core dependencies
import React from "react";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";

// custom components
import Layout from "./_layout";
import { ForgetPassword } from "./_components/forget-password";

// handler functions
import { useAuthStore } from "@/lib/store/useAuthStore";

// component logic
const ForgetPasswordScreen = () => {
  const router = useRouter();
  const { forgetPassword } = useAuthStore();

  const handleSubmit = async (email: string) => {
    try {
      await forgetPassword(email);
    } catch (error: any) {
      toast.warning(error);
    }
  };

  const goBackToLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <Layout>
      <ForgetPassword handleSubmit={handleSubmit} goBackToLogin={goBackToLogin} />
    </Layout>
  );
};

export default ForgetPasswordScreen;

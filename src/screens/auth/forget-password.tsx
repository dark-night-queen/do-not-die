// core dependencies
import React from "react";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";

// custom components
import Layout from "./_layout";
import { ForgetPassword } from "./_components/forget-password";

// handler functions
import { useAuth } from "@/providers/auth-provider";

// component logic
const ForgetPasswordScreen = () => {
  const router = useRouter();
  const { forgetPassword } = useAuth();

  const handleSubmit = async (email: string) => {
    try {
      await forgetPassword(email);
    } catch (error: any) {
      toast.warning(error);
    }
  };

  const goBackToLogin = () => {
    router.push("/auth");
  };

  return (
    <Layout>
      <ForgetPassword
        handleSubmit={handleSubmit}
        goBackToLogin={goBackToLogin}
      />
    </Layout>
  );
};

export default ForgetPasswordScreen;

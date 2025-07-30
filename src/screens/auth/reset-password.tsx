// core dependencies
import React from "react";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";

// custom components
import Layout from "./_layout";
import { ResetPassword } from "./_components/reset-password";

// handler functions
import { useAuth } from "@/providers/auth-provider";

// component logic
const ResetPasswordScreen = () => {
  const router = useRouter();
  const { resetPassword } = useAuth();

  const handleSubmit = async (password: string) => {
    try {
      await resetPassword(password);
      router.push("/auth");
    } catch (error: any) {
      toast.warning(error);
    }
  };

  return (
    <Layout>
      <ResetPassword handleSubmit={handleSubmit} />
    </Layout>
  );
};

export default ResetPasswordScreen;

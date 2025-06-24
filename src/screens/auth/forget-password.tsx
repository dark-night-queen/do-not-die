import React from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";
import { ForgetPassword } from "./_components/forget-password";
import Layout from "./_layout";

export default () => {
  const router = useRouter();
  const { forgetPassword } = useAuthStore();

  const handleSubmit = async (email: string) => {
    await forgetPassword(email);
  };

  const goBackToLogin = () => {
    router.push("/(auth)");
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

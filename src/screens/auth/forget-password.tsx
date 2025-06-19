import React from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";
import { ForgetPassword } from "./_components/forget-password";
import Layout from "./_layout";

export default () => {
  const router = useRouter();
  const { setShowLoader, forgetPassword } = useAuthStore();

  const handleSubmit = async (email: string) => {
    setShowLoader("forget-password", true);
    await forgetPassword(email);
    setShowLoader("forget-password", false);
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

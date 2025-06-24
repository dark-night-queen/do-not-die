import React from "react";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";
import { useAuthStore } from "@/store/useAuthStore";
import { Login } from "./_components/login";
import Layout from "./_layout";

export default () => {
  const router = useRouter();
  const { login, signup } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    const {
      data: { session, user },
      error,
    } = await login(email, password);
    if (error) toast.warning(error.message);
  };

  const handleSignup = async (email: string, password: string) => {
    const {
      data: { session },
      error,
    } = await signup(email, password);

    if (error) toast.warning(error.message.replaceAll(",", "\n"));
    else if (!session) toast("Please check your inbox for email verification!");
  };

  const handleForgetPassword = () => {
    router.push("/(auth)/forget-password");
  };

  return (
    <Layout>
      <Login
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        handleForgetPassword={handleForgetPassword}
      />
    </Layout>
  );
};

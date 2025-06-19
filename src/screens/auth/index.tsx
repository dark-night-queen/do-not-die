import React from "react";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";
import { useAuth, useAuthStore } from "@/providers/auth-provider";
import { Login } from "./_components/login";
import Layout from "./_layout";

export default () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const { login, signup, setShowLoader } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    setShowLoader("login", true);
    const {
      data: { session, user },
      error,
    } = await login(email, password);
    if (error) toast.warning(error.message);
    setShowLoader("login", false);
  };

  const handleSignup = async (email: string, password: string) => {
    setShowLoader("signup", true);
    const {
      data: { session },
      error,
    } = await signup(email, password);

    if (error) toast.warning(error.message.replaceAll(",", "\n"));
    else if (!session) toast("Please check your inbox for email verification!");

    setShowLoader("signup", false);
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

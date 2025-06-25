import React from "react";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";
import { useAuth } from "@/providers/auth-provider";
import { useAuthStore } from "@/store/useAuthStore";
import { Login } from "./_components/login";
import Layout from "./_layout";

export default () => {
  const router = useRouter();
  // TODO: move both login and signup to auth-provider
  const { login } = useAuthStore();
  const { signup } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    const {
      data: { session, user },
      error,
    } = await login(email, password);
    if (error) toast.warning(error.message);
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      await signup(email, password);
    } catch (error: any) {
      toast.warning(error.replaceAll(",", "\n"));
    }
  };

  const handleForgetPassword = () => {
    router.push("/auth/forget-password");
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

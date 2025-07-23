// core dependencies
import React from "react";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";

// custom components
import Layout from "./_layout";
import { Login } from "./_components/login";

// handler functions
import { useAuth } from "@/providers/auth-provider";

// component logic
const AuthScreen = () => {
  const router = useRouter();
  const { login, signup } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (error: any) {
      toast.warning(error);
    }
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

export default AuthScreen;

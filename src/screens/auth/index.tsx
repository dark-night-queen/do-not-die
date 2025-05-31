import React from "react";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { toast } from "sonner-native";
import { useAuth, useAuthStore } from "@/providers/auth-provider";
import { supabase } from "@/utils/supabase";
import { Box } from "@/components/ui";
import { Login } from "./_components/login";

export default () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const { setShowLoader } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    setShowLoader("login", true);
    const {
      data: { session, user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) toast.warning(error.message);
    else if (session) {
      router.push("/(auth)/onboarding");
    }

    setShowLoader("login", false);
  };

  const handleSignup = async (email: string, password: string) => {
    setShowLoader("signup", true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) toast.warning(error.message.replaceAll(",", "\n"));
    else if (!session) toast("Please check your inbox for email verification!");

    setShowLoader("signup", false);
  };

  const handleForgetPassword = () => {
    router.push("/(auth)/forget-password");
  };

  return (
    <ScrollView>
      <Box variant="screen">
        <Login
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          handleForgetPassword={handleForgetPassword}
        />
      </Box>
    </ScrollView>
  );
};

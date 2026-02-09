import React from "react";
import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function AppLayout() {
  const { session } = useAuthStore();
  //   const { profile } = useProfileStore();

  console.log("first", session);

  // If no session, kick to login
  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  // If no profile, kick to onboarding (Logic for your multi-step flow)
  //   if (!profile) {
  //     return <Redirect href="/(app)/onboarding" />;
  //   }

  return <Stack screenOptions={{ headerShown: false }} />;
}

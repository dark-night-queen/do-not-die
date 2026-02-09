import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function AuthLayout() {
  const { session } = useAuthStore();

  // If user is already logged in, send them to the app
  if (session) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

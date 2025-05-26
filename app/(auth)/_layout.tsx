import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="forget-password" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/goal" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/activity" options={{ headerShown: false }} />
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="goal" options={{ headerShown: false }} />
      <Stack.Screen name="activity" options={{ headerShown: false }} />
    </Stack>
  );
}

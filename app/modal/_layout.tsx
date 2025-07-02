import React from "react";
import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Heart Data Modal Screen */}
      {/* <Stack.Screen name="heart-data" options={{ presentation: "modal" }} />
      <Stack.Screen name="notification" options={{ presentation: "modal" }} />
      <Stack.Screen name="profile-edit" options={{ presentation: "modal" }} /> */}
    </Stack>
  );
}

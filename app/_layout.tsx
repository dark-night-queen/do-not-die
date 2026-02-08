import "@/global.css";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import LoadingScreen from "./(loaders)/index"; // Ensure path is correct

// handler functions
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Keep native splash screen visible
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);

  // 1. Load Fonts
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // 2. Handle Font Errors
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // 3. App Readiness Logic (Fonts + Data)
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load data, check auth, or delay for Gemini keys
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
      }
    }
    prepare();
  }, []);

  // 4. Hide Splash Screen only when BOTH are ready
  useEffect(() => {
    if (fontsLoaded && isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isAppReady]);

  // While waiting, return your custom animated loader
  if (!fontsLoaded || !isAppReady) {
    return <LoadingScreen />;
  }

  return (
    <GluestackUIProvider mode="dark">
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}

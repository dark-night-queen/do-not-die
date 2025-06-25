import "@/global.css";
import "react-native-reanimated";

import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthProvider, useAuthStore } from "@/providers/auth-provider";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [appReady, setAppReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  const { getSession, session } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      await getSession();

      if (!session) {
        setInitialRoute("auth");
      }

      setTimeout(() => {
        setAppReady(true);
      }, 3000);
    };
    checkAuth();
  }, [session]);

  return (
    <GluestackUIProvider mode="system">
      <GestureHandlerRootView>
        <AuthProvider>
          <Stack
            initialRouteName={
              appReady && initialRoute ? initialRoute : "(loaders)"
            }
          >
            <Stack.Screen name="(loaders)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </AuthProvider>
        <Toaster position="bottom-center" duration={3000} visibleToasts={2} />
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}

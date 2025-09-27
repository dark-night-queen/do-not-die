import "@/global.css";
import "react-native-reanimated";

// core dependencies
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// handler functions
import { RouterProvider } from "@/providers/router-provider";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let queryClient: QueryClient;

export default function RootLayout() {
  if (!queryClient) queryClient = new QueryClient();

  return (
    <GluestackUIProvider mode="system">
      <Toaster position="bottom-center" duration={3000} visibleToasts={2} />

      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <RouterProvider>
            <Stack
              initialRouteName="(loaders)"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            </Stack>
          </RouterProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>

      {/* System status bar */}
      <StatusBar />
    </GluestackUIProvider>
  );
}

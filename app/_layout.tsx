import "@/global.css";
import "react-native-reanimated";

// core dependencies
import { useEffect, useState } from "react";
import { InteractionManager } from "react-native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// handler functions
import { AuthProvider } from "@/providers/auth-provider";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore, useUserStore } from "@/store/useOnboardingStore";
import { useNutrientAnalysisStore } from "@/store/useNutrientAnalysisStore";

const queryClient = new QueryClient();

// TODO: Fix onboarding / tabs flow when user logs back in
export default function RootLayout() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isInitLoading, setIsInitLoading] = useState(true);
  const { session, redirected, setRedirected } = useAuthStore();
  const { user, getUser } = useUserStore();
  const { profile, getProfile } = useProfileStore();
  const { init } = useNutrientAnalysisStore();

  // Wait for animation and auth check
  useEffect(() => {
    const loadApp = async () => {
      // simulate delay for loader animation (e.g., 1.5s)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // wait until react-native interactions complete (i.e., UI stable)
      await new Promise((resolve) => {
        InteractionManager.runAfterInteractions(() => resolve(undefined));
      });

      setIsInitLoading(false);
    };

    loadApp();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      if (session && !user.id) {
        const _user = await getUser(session.user.id);
        if (_user && _user.id) {
          const _profile = await getProfile(_user.id);
          init(_profile);
        }
      }

      setIsLoading(false);
    };

    loadUser();
  }, [getProfile, getUser, init, session, user.id]);

  useEffect(() => {
    if (!isLoading && !isInitLoading && !redirected) {
      if (session) {
        if (profile.isOnboardingCompleted) {
          router.replace("/(tabs)");
        } else {
          router.replace("/onboarding");
        }
      } else {
        router.replace("/auth");
      }
      setRedirected(true);
    }
  }, [
    isLoading,
    redirected,
    session,
    profile.isOnboardingCompleted,
    setRedirected,
    router,
    isInitLoading,
  ]);

  return (
    <GluestackUIProvider mode="system">
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            </Stack>
          </AuthProvider>

          <Toaster position="bottom-center" duration={3000} visibleToasts={2} />
        </GestureHandlerRootView>
      </QueryClientProvider>

      <StatusBar />
    </GluestackUIProvider>
  );
}

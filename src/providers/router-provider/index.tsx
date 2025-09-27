// core dependencies
import React, { useCallback, useEffect, useRef } from "react";
import { Href, usePathname, useRouter } from "expo-router";
import { useDebouncedCallback } from "use-debounce";

// handler functions
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useOnboardingStore";
import { AuthProvider } from "@/providers/auth-provider";

// constants
import { Routes } from "./routes";

type RouterProviderType = React.PropsWithChildren;

export const RouterProvider = ({ children }: RouterProviderType) => {
  const router = useRouter();
  const pathname = usePathname();

  const { session } = useAuthStore();
  const { profile, getProfile } = useProfileStore();

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const redirect = useCallback(
    (target: Href) => {
      if (pathname !== target) {
        router.replace(target);
      }
    },
    [pathname, router],
  );

  const handleRoutes = useCallback(async () => {
    // If no session, always redirect to auth
    if (!session) {
      redirect(Routes.AUTH);
      return;
    }

    const profile = await getProfile(session.user.id);
    if (!profile) {
      redirect(Routes.ONBOARDING);
      return;
    }

    if (
      [Routes.AUTH, Routes.ONBOARDING, Routes.ROOT].includes(pathname as Href)
    ) {
      redirect(Routes.HOME);
    }
  }, [getProfile, pathname, redirect, session, profile]);

  const debouncedRoutes = useDebouncedCallback(handleRoutes, 500);

  useEffect(() => {
    debouncedRoutes();
  }, [debouncedRoutes, pathname, session]);

  return <AuthProvider>{children}</AuthProvider>;
};

// core dependencies
import React from "react";

// core components
import { VStack } from "@/components/ui";
import DefaultLayout from "@/screens/_layout";

// custom components
import { Stats } from "./_components/stats";
import { User } from "./_components/user";
import { ActionButtons } from "./_components/action-button";
import { Menu } from "./_components/menu";
import { Settings } from "./_components/setting";

// constants
import { useAuth } from "@/providers/auth-provider";
import {
  initUserState,
  useProfileStore,
  useUserStore,
} from "@/store/useOnboardingStore";

// component logic
// TODO: See if I can change the warning btn to have light background
// TODO: Reset onboarding's multiple method are being called in child comp, can we merge them in one?
const ProfileScreen = () => {
  const { user, setUser } = useUserStore();
  const { profile } = useProfileStore();

  const { logout } = useAuth();

  const resetOnboarding = async () => {};

  const handleLogout = async () => {
    await logout();
    setUser(initUserState);
  };

  return (
    <DefaultLayout>
      <User user={user} />
      <Stats profile={profile} />

      <VStack className="gap-4">
        <Menu profile={profile} />
        <Settings />
      </VStack>

      <ActionButtons logout={handleLogout} resetOnboarding={resetOnboarding} />
    </DefaultLayout>
  );
};

export default ProfileScreen;

// core dependencies
import React from "react";
import { useRouter } from "expo-router";
import { Activity, BarChart2, Heart, User } from "lucide-react-native";

// custom components
import { GhostButton } from "@/screens/_components/ghost-button";

// constants
import { Profile } from "@/constants/user";

interface IMenuType {
  profile: Profile;
}

// component logic
export const Menu = ({ profile }: IMenuType) => {
  const router = useRouter();

  const onPressActivity = () => {};
  const onPressAnalytics = () => router.replace("/(tabs)/analytics");
  const onPressHealthData = () => router.replace("/modal/heart-data");
  const onPressEditProfile = () => router.replace("/modal/edit-profile");

  return (
    <>
      <GhostButton
        icon={BarChart2}
        name="Analytics"
        showArrow={true}
        onPress={onPressAnalytics}
      />

      <GhostButton
        icon={Heart}
        name="Health Data"
        showArrow={true}
        onPress={onPressHealthData}
      />

      <GhostButton
        icon={Activity}
        name="Activity Level"
        showArrow={true}
        value={profile?.activityLevel?.toLowerCase() ?? ""}
        onPress={onPressActivity}
      />

      <GhostButton
        icon={User}
        name="Edit Profile Info"
        showArrow={true}
        onPress={onPressEditProfile}
      />
    </>
  );
};

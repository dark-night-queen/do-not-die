import React from "react";
import { Link } from "expo-router";
import { Activity, BarChart2, Heart, User } from "lucide-react-native";
import { VStack } from "@/components/ui";

import { GhostButton } from "./ghost-button";
import { Settings } from "./setting";
import { useActivityStore } from "@/store/useOnboardingStore";
// import { ActivityModal } from './ActivityModal';

export const Menu = () => {
  const { activity } = useActivityStore();
  // const [showModal, setShowModal] = React.useState(false);

  // const onPressActivity = () => setShowModal(true);
  // const closeActivityModal = () => setShowModal(false);

  return (
    <VStack className="gap-4">
      <Link href="/(tabs)/analytics" asChild>
        <GhostButton icon={BarChart2} name="Analytics" showArrow={true} />
      </Link>

      <Link href="/modal/heart-data" asChild>
        <GhostButton icon={Heart} name="Health Data" showArrow={true} />
      </Link>

      <GhostButton
        icon={Activity}
        name="Activity Level"
        showArrow={true}
        value={activity?.activityLevel?.toLowerCase() ?? ""}
        // onPress={onPressActivity}
      />

      <Link href="/modal/profile-edit" asChild>
        <GhostButton icon={User} name="Edit Profile Info" showArrow={true} />
      </Link>
      <Settings />

      {/* Modals */}
      {/* <ActivityModal showModal={showModal} closeModal={closeActivityModal} /> */}
    </VStack>
  );
};

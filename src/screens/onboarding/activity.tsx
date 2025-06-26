import React from "react";
import { useNavigation, useRouter } from "expo-router";
import {
  Activity,
  useActivityStore,
  useProfileStore,
} from "@/store/useOnboardingStore";
import { ActivityLevel } from "@/constants/user.activity.type";
import { UserActivityLevel } from "./_components/activity-level";
import Layout from "./_layout";

export default () => {
  const router = useRouter();
  const navigate = useNavigation();
  const { profile, updateProfile } = useProfileStore();
  const { activity, createActivity, updateActivity } = useActivityStore();

  const [isDisabled, setIsDisabled] = React.useState(true);
  const [formData, setFormData] = React.useState({
    activityLevel: activity?.activityLevel || ("" as ActivityLevel),
  });

  React.useEffect(() => {
    const hasEmptyField = Object.values(formData).some((value) => !value);
    setIsDisabled(hasEmptyField);
  }, [formData]);

  const handleChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const goBack = () => {
    navigate.canGoBack()
      ? navigate.goBack()
      : router.push("/auth/onboarding/goal");
  };

  const handleCreateActivity = async (newActivity: Activity) => {
    const { error } = await createActivity(newActivity);
    if (error) return console.error("Error creating user's activity:", error);
  };

  const handleUpdateActivity = async (updatedActivity: Activity) => {
    const { error } = await updateActivity(updatedActivity);
    if (error) return console.error("Error updating user's activity:", error);
  };

  const handleSubmit = async () => {
    if (!profile?.id) {
      console.error("Profile does not exists!");
      return;
    }

    const updatedActivity: Activity = {
      profileId: profile.id,
      activityLevel: formData.activityLevel,
    };

    if (!activity) {
      await handleCreateActivity(updatedActivity);
    } else {
      await handleUpdateActivity(updatedActivity);
    }

    const updatedProfile = { ...profile };
    updatedProfile.isOnboardingComplete = true;
    updatedProfile.dailyCalorieTarget = 1;
    await updateProfile(updatedProfile);
  };

  return (
    <Layout
      onSubmit={handleSubmit}
      goBack={goBack}
      button={{ text: "Complete Setup", isDisabled }}
    >
      <UserActivityLevel formData={formData} handleChange={handleChange} />
    </Layout>
  );
};

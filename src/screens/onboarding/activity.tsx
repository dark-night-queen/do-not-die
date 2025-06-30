import React from "react";
import { useNavigation, useRouter } from "expo-router";
import {
  Activity,
  useActivityStore,
  useProfileStore,
  useGoalStore,
  Goal,
} from "@/store/useOnboardingStore";
import { ActivityLevel } from "@/constants/user.activity.type";
import { UserActivityLevel } from "./_components/activity-level";
import Layout from "./_layout";
import { CalorieCalculations } from "@/utils/calorie-calculations";

const Activity = () => {
  const router = useRouter();
  const navigate = useNavigation();

  const { activity, createActivity, updateActivity } = useActivityStore();
  const { goal } = useGoalStore();
  const { profile, updateProfile } = useProfileStore();

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

  const updateUserOnboarding = async (cc: CalorieCalculations) => {
    const calorieCalculations = cc.calculateDailyCalories();

    const updatedProfile = { ...profile };
    updatedProfile.isOnboardingComplete = true;
    updatedProfile.bmr = calorieCalculations.bmr;
    updatedProfile.tdee = calorieCalculations.tdee;
    updatedProfile.dailyCalorieTarget = calorieCalculations.dailyCalorieTarget;
    updatedProfile.weeklyWeightChange = calorieCalculations.weeklyWeightChange;
    await updateProfile(updatedProfile);
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

    const cc = new CalorieCalculations(
      profile,
      updatedActivity,
      goal ?? ({} as Goal),
    );
    await updateUserOnboarding(cc);
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
export default Activity;

// core dependencies
import React from "react";
import { useRouter } from "expo-router";

// custom components
import Layout from "./_layout";
import { UserActivityLevel } from "./_components/activity-level";

// handler functions
import { ActivityLevel, Profile } from "@/constants/user";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useOnboardingStore";
import { calculateDailyCalories } from "@/utils/calorie-calculations";

// component logic
const ActivityScreen = () => {
  const router = useRouter();
  const { setRedirected } = useAuthStore();
  const { profile, updateProfile } = useProfileStore();

  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [formData, setFormData] = React.useState({
    activityLevel: profile?.activityLevel,
  });
  // stores calorie calculation metadata
  const [meta, setMeta] = React.useState({
    bmr: profile?.bmr ?? 0,
    tdee: profile?.tdee ?? 0,
    dailyCalorieTarget: profile?.dailyCalorieTarget ?? 0,
    weeklyWeightChange: profile?.weeklyWeightChange ?? 0,
    targetMacroNutrient: profile?.targetMacroNutrient ?? {},
  });

  React.useEffect(() => {
    const hasEmptyField = Object.values(formData).some((value) => !value);
    setIsDisabled(hasEmptyField);
  }, [formData]);

  const handleChange = (name: string) => (value: string) => {
    setIsUpdated(true);
    setFormData((prev) => ({ ...prev, [name]: value }));

    // do calorie calculations here
    if (!profile) return;
    const {
      bmr,
      tdee,
      dailyCalorieTarget,
      weeklyWeightChange,
      targetMacroNutrient,
    } = calculateDailyCalories(profile, value as ActivityLevel);
    setMeta((prev) => ({
      ...prev,
      bmr,
      tdee,
      dailyCalorieTarget,
      weeklyWeightChange,
      targetMacroNutrient,
    }));
  };

  const handleSubmit = async () => {
    if (!profile?.id) {
      console.error("Profile does not exists!");
      router.push("/auth");
      return;
    }

    if (isUpdated) {
      const updatedProfile: Profile = {
        ...profile,
        ...meta,
        activityLevel: formData.activityLevel,
        isOnboardingCompleted: true,
      };

      await updateProfile(updatedProfile);
      setRedirected(false);
    }
  };

  return (
    <Layout
      goBackRoute="/onboarding/goal"
      onSubmit={handleSubmit}
      button={{ text: "Complete Setup", isDisabled }}
    >
      <UserActivityLevel
        formData={formData}
        meta={meta}
        handleChange={handleChange}
      />
    </Layout>
  );
};

export default ActivityScreen;

import React from "react";
import { useNavigation, useRouter } from "expo-router";
import {
  Goal,
  useGoalStore,
  useProfileStore,
} from "@/store/useOnboardingStore";
import { UnitSystemOptions } from "@/constants/user.bodyMetric.type";
import { GoalType, GoalDuration } from "@/constants/user.goal.type";
import { UserGoals } from "./_components/user-goals";
import Layout from "./_layout";

// TODO: Call API only if update has been made
export default () => {
  const router = useRouter();
  const navigate = useNavigation();
  const { profile } = useProfileStore();
  const { goal, setGoal, createGoal, updateGoal, getGoal } = useGoalStore();

  React.useEffect(() => {
    if (goal?.id || !profile?.id) return;

    getGoal(profile.id);
  }, [profile]);

  const [formData, setFormData] = React.useState({
    type: goal?.type || ("" as GoalType),
    duration: goal?.duration || ("" as GoalDuration),
    targetWeight: goal?.targetWeight.toString() || "",
    unitSystem: profile?.unitSystem ?? UnitSystemOptions.Metric,
  });

  const [errors, setErrors] = React.useState({
    type: "",
    duration: "",
    targetWeight: "",
  });

  const handleChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = { ...errors };
    if (!formData.type) newErrors.type = "Goal type is required";
    if (!formData.duration) newErrors.duration = "Goal duration is required";
    if (!formData.targetWeight)
      newErrors.targetWeight = "Target weight is required";
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const goBack = () => {
    navigate.canGoBack() ? navigate.goBack() : router.push("/auth/onboarding");
  };

  const handleCreateGoal = async (newGoal: Goal) => {
    console.log("handleCreateGoal", goal, newGoal);
    const { data, error } = await createGoal(newGoal);

    if (error) return console.error("Error creating user's goal:", error);
    setGoal(data[0] as Goal);
  };

  const handleUpdateGoal = async (updatedGoal: Goal) => {
    console.log("handleUpdateGoal", updatedGoal);
    const { data, error } = await updateGoal(updatedGoal);

    if (error) return console.error("Error updating user's goal:", error);
    setGoal(data[0] as Goal);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (!profile?.id) {
      console.error("Profile does not exists!");
      return;
    }

    const updatedGoal: Goal = {
      profileId: profile.id,
      type: formData.type,
      targetWeight: parseFloat(formData.targetWeight),
      duration: formData.duration,
    };

    if (!goal) {
      await handleCreateGoal(updatedGoal);
    } else {
      updatedGoal.id = goal.id;
      await handleUpdateGoal(updatedGoal);
    }

    router.push("/auth/onboarding/activity");
  };

  return (
    <Layout onSubmit={handleSubmit} goBack={goBack}>
      <UserGoals
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />
    </Layout>
  );
};

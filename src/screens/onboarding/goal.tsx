// core dependencies
import React from "react";
import { useRouter } from "expo-router";

// custom components
import Layout from "./_layout";
import { UserGoals } from "./_components/user-goals";

// handler functions
import { Profile, UNIT_SYSTEM } from "@/constants/user";
import { useProfileStore } from "@/store/useOnboardingStore";
import { lbsToKg } from "@/utils/units";

// component logic
const GoalScreen = () => {
  const router = useRouter();
  const { profile, updateProfile } = useProfileStore();

  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [formData, setFormData] = React.useState({
    type: profile.goalType,
    duration: profile.goalDuration,
    targetWeight: profile.displayTargetWeight?.toString() || "",
    targetWeightKg: profile.targetWeightKg,
  });

  const meta = React.useMemo(
    () => ({
      weight: profile.displayWeight?.toString() || "70",
      unitSystem: profile.unitSystem ?? UNIT_SYSTEM.Metric,
    }),
    [profile],
  );

  const [errors, setErrors] = React.useState({
    targetWeight: "",
  });

  React.useEffect(() => {
    const hasEmptyField = Object.values(formData).some((value) => !value);
    setIsDisabled(hasEmptyField);
  }, [formData]);

  const handleChange = (name: string) => (value: string) => {
    setIsUpdated(true);
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "targetWeight") {
      // Convert target weight to kg if unit system is imperial
      const targetWeight = parseFloat(value);

      if (meta.unitSystem === UNIT_SYSTEM.Imperial) {
        setFormData((prev) => ({
          ...prev,
          targetWeightKg: lbsToKg(targetWeight),
        }));
      } else {
        setFormData((prev) => ({ ...prev, targetWeightKg: targetWeight }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = { ...errors };
    if (!formData.targetWeight)
      newErrors.targetWeight = "Target weight is required";
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (!profile.id) {
      console.error("Profile does not exists!");
      router.push("/auth");
      return;
    }

    if (isUpdated) {
      const updatedProfile: Profile = {
        ...profile,
        goalType: formData.type,
        goalDuration: formData.duration,
        displayTargetWeight: parseFloat(formData.targetWeight),
        targetWeightKg: formData.targetWeightKg,
      };

      await updateProfile(updatedProfile);
    }

    router.push("/onboarding/activity");
  };

  return (
    <Layout
      goBackRoute="/onboarding"
      onSubmit={handleSubmit}
      button={{ text: "Continue", isDisabled }}
    >
      <UserGoals
        formData={formData}
        meta={meta}
        errors={errors}
        handleChange={handleChange}
      />
    </Layout>
  );
};

export default GoalScreen;

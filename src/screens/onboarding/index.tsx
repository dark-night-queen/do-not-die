// core dependencies
import React from "react";
import { useRouter } from "expo-router";

// custom components
import Layout from "./_layout";
import { BodyMetrics } from "./_components/body-metrics";

// handler functions
import type { Profile } from "@/constants/user";
import { UNIT_SYSTEM } from "@/constants/user";
import { useProfileStore, useUserStore } from "@/store/useOnboardingStore";
import {
  feetToCm,
  getDisplayHeight,
  getDisplayWeight,
  lbsToKg,
} from "@/utils/units";

// component logic
const OnboardingScreen = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const { profile, createProfile, updateProfile } = useProfileStore();

  const [isUpdated, setIsUpdated] = React.useState(false);
  const [formData, setFormData] = React.useState({
    age: profile?.age?.toString() || "",
    gender: profile?.gender || null,
    unitSystem: profile?.unitSystem || UNIT_SYSTEM.Metric,
    height: profile?.displayHeight?.toString() || "",
    weight: profile?.displayWeight?.toString() || "",
    heightCm: profile?.heightCm?.toString() || "",
    weightKg: profile?.weightKg?.toString() || "",
    dietaryPreference: profile?.dietaryPreference || null,
  });

  const [errors, setErrors] = React.useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    dietaryPreference: "",
  });

  const handleChange = (name: string) => (value: string) => {
    setIsUpdated(true);
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "unitSystem") {
      // Reset height and weight when unit system changes
      setFormData((prev) => ({
        ...prev,
        height: getDisplayHeight(formData.height, value),
        weight: getDisplayWeight(formData.weight, value),
      }));
    } else if (name === "height") {
      // Convert height to cm if unit system is imperial
      if (formData.unitSystem === UNIT_SYSTEM.Imperial) {
        setFormData((prev) => ({ ...prev, heightCm: feetToCm(value) }));
      } else setFormData((prev) => ({ ...prev, heightCm: value }));
    } else if (name === "weight") {
      // Convert weight to kg if unit system is imperial
      if (formData.unitSystem === UNIT_SYSTEM.Imperial) {
        setFormData((prev) => ({
          ...prev,
          weightKg: lbsToKg(parseFloat(value)).toString(),
        }));
      } else setFormData((prev) => ({ ...prev, weightKg: value }));
    }
  };

  const validateForm = () => {
    const newErrors = { ...errors };
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.height) newErrors.height = "Height is required";
    if (!formData.weight) newErrors.weight = "Weight is required";
    if (!formData.dietaryPreference)
      newErrors.dietaryPreference = "Dietary preference is required";

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  const handleSubmit = async () => {
    // Validate form before submission
    if (!validateForm()) return;

    if (!user || !user.id) {
      console.error("User is not logged in");
      router.push("/auth");
      return;
    }

    if (isUpdated) {
      const updatedProfile: Profile = {
        userId: user.id,
        age: parseInt(formData.age),
        gender: formData.gender,
        unitSystem: formData.unitSystem,
        heightCm: parseFloat(formData.heightCm),
        displayHeight: parseFloat(formData.height),
        weightKg: parseFloat(formData.weightKg),
        displayWeight: parseFloat(formData.weight),
        dietaryPreference: formData.dietaryPreference,
      };

      if (!profile?.id) {
        await createProfile(updatedProfile);
      } else {
        await updateProfile({ ...profile, ...updatedProfile });
      }
    }

    router.push("/onboarding/goal");
  };

  return (
    <Layout onSubmit={handleSubmit} button={{ text: "Next" }}>
      <BodyMetrics
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />
    </Layout>
  );
};

export default OnboardingScreen;

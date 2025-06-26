import React from "react";
import { useRouter } from "expo-router";
import {
  Profile,
  useProfileStore,
  useBodyMetricsStore,
} from "@/store/useOnboardingStore";
import {
  Gender,
  UnitSystem,
  UnitSystemOptions,
  DietaryPreference,
} from "@/constants/user.bodyMetric.type";
import { useUserStore } from "@/store/useUserStore";
import { BodyMetrics } from "./_components/body-metrics";
import Layout from "./_layout";

// TODO: Call API only if update has been made
export default () => {
  const router = useRouter();
  const { getDisplayHeight, getDisplayWeight } = useBodyMetricsStore();
  const { user } = useUserStore();
  const { profile, createProfile, setProfile, updateProfile } =
    useProfileStore();

  const [formData, setFormData] = React.useState({
    age: profile?.age?.toString() || "",
    gender: profile?.gender || ("" as Gender),
    unitSystem: profile?.unitSystem || UnitSystemOptions.Metric,
    height: profile?.height?.toString() || "",
    weight: profile?.weight?.toString() || "",
    dietaryPreference: profile?.dietaryPreference || ("" as DietaryPreference),
  });

  const [errors, setErrors] = React.useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    dietaryPreference: "",
  });

  const handleChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "unitSystem") {
      // Reset height and weight when unit system changes
      setFormData((prev) => ({
        ...prev,
        height: getDisplayHeight(formData.height, formData.unitSystem),
        weight: getDisplayWeight(formData.weight, formData.unitSystem),
      }));
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

  const handleCreateProfile = async (newProfile: Profile) => {
    const { data, error } = await createProfile(newProfile);

    if (error) return console.error("Error creating user's profile:", error);
    setProfile(data[0] as Profile);
  };

  const handleUpdateProfile = async (updatedProfile: Profile) => {
    const { data, error } = await updateProfile(updatedProfile);

    if (error) return console.error("Error updating profile:", error);
    setProfile(data[0] as Profile);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (!user) {
      console.error("User is not logged in");
      return;
    }

    const updatedProfile: Profile = {
      userId: user.id,
      age: parseInt(formData.age),
      gender: formData.gender as Gender,
      unitSystem: formData.unitSystem as UnitSystem,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      dietaryPreference: formData.dietaryPreference as DietaryPreference,
    };

    if (!profile) {
      await handleCreateProfile(updatedProfile);
    } else {
      updatedProfile.id = profile.id;
      await handleUpdateProfile(updatedProfile);
    }

    router.push("/auth/onboarding/goal");
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

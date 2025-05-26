import React from "react";
import { VStack, Text, Button, ButtonText } from "@/components/ui";
import {
  FormElement,
  InputElement,
  RadioElement,
} from "@/components/ui/form-control/form";
import {
  DietaryPreference,
  Gender,
  UnitSystem,
} from "@/constants/user.options";
import { useRouter } from "expo-router";

export const CaptureUserDetails = () => {
  const unitSystemOptions = Object.values(UnitSystem);
  const genderOptions = Object.values(Gender);
  const dietaryPreferenceOptions = Object.values(DietaryPreference);

  const router = useRouter();

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = () => {
    router.push("/(auth)/onboarding/goal");
  };

  return (
    <VStack className="w-full max-w-sm p-4 gap-6">
      <VStack className="items-center gap-1">
        <Text className="text-2xl font-bold">Tell us about yourself</Text>
        <Text className="text-sm text-gray-400">
          Help us personalize your experience
        </Text>
      </VStack>

      <VStack className="w-full gap-4">
        <FormElement label="Age" error={errors.age}>
          <InputElement
            placeholder="Enter your age"
            // value={formData.age}
            // onChangeText={handleChange("age")}
            inputMode="numeric"
            keyboardType="number-pad"
          />
        </FormElement>

        <FormElement label="Gender" error={errors.gender}>
          <RadioElement
            direction="horizontal"
            options={genderOptions}
            // value={formData.gender}
            // onChange={handleChange("gender")}
          />
        </FormElement>

        <FormElement label="Unit System">
          <RadioElement
            direction="horizontal"
            options={unitSystemOptions}
            // value={unitSystem}
            // onChange={convertUnitSystem}
          />
        </FormElement>

        <FormElement label="Height" error={errors.height}>
          <InputElement
            placeholder="Enter Height"
            // value={displayHeight}
            // onChangeText={setHeight}
            inputMode="decimal"
            keyboardType="decimal-pad"
          >
            {/* <InputSlot className="px-3">
              <Text>{heightUnitSystem}</Text>
            </InputSlot> */}
          </InputElement>
        </FormElement>

        <FormElement label="Weight" error={errors.weight}>
          <InputElement
            placeholder="Enter Weight"
            // value={displayWeight}
            // onChangeText={setWeight}
            inputMode="decimal"
            keyboardType="decimal-pad"
          >
            {/* <InputSlot className="px-3">
              <Text>{weightUnitSystem}</Text>
            </InputSlot> */}
          </InputElement>
        </FormElement>

        <FormElement label="Dietary Preference">
          <RadioElement
            options={dietaryPreferenceOptions}
            // value={formData.dietaryPreference}
            // onChange={handleChange("dietaryPreference")}
          />
        </FormElement>

        {/* {bmi ? <BMIDisplay bmi={bmi} /> : null} */}
      </VStack>

      <Button className="w-full rounded-lg" size="sm" onPress={handleSubmit}>
        <ButtonText>Next</ButtonText>
      </Button>
    </VStack>
  );
};

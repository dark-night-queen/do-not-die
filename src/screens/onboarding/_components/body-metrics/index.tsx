// core components
import { InputSlot, Text, VStack } from "@/components/ui";

// custom components
import { FormElement, InputElement, RadioElement } from "@/components/custom";
import { BMIDisplay } from "./bmi-display";

// handler functions
import { getHeightUnitSystem, getWeightUnitSystem } from "@/utils/units";
import type { DietaryPreference, Gender, UnitSystem } from "@/constants/user";
import { DIETARY_PREFERENCE, GENDER, UNIT_SYSTEM } from "@/constants/user";

interface IBodyMetricsProps {
  formData: {
    age: string;
    gender: Gender;
    unitSystem: UnitSystem;
    height: string;
    weight: string;
    heightCm: string;
    weightKg: string;
    dietaryPreference: DietaryPreference;
  };
  errors: {
    age: string;
    gender: string;
    height: string;
    weight: string;
    dietaryPreference: string;
  };
  handleChange: (name: string) => (value: string) => void;
}

// component logic
export const BodyMetrics = ({
  formData,
  errors,
  handleChange,
}: IBodyMetricsProps) => {
  const genderOptions = Object.freeze(GENDER);
  const unitSystemOptions = Object.freeze(UNIT_SYSTEM);
  const dietaryPreferenceOptions = Object.freeze(DIETARY_PREFERENCE);

  const calculateBMI = (heightCm: string, weightKg: string) => {
    const heightM = parseInt(heightCm) / 100;
    if (!heightM) return 0;
    return parseInt(weightKg) / (heightM * heightM);
  };

  const bmi = calculateBMI(formData.heightCm, formData.weightKg);
  const heightUnitSystem = getHeightUnitSystem(formData.unitSystem);
  const weightUnitSystem = getWeightUnitSystem(formData.unitSystem);

  return (
    <>
      <VStack className="items-center gap-1">
        <Text className="text-2xl font-bold">Tell us about yourself</Text>
        <Text className="text-sm text-gray-400">
          Help us personalize your experience
        </Text>
      </VStack>

      <FormElement label="Age" error={errors.age}>
        <InputElement
          placeholder="Enter your age"
          value={formData.age}
          onChangeText={handleChange("age")}
          inputMode="numeric"
          keyboardType="number-pad"
        />
      </FormElement>

      <FormElement label="Gender" error={errors.gender}>
        <RadioElement
          direction="horizontal"
          options={genderOptions}
          value={formData.gender as string}
          onChange={handleChange("gender")}
        />
      </FormElement>

      <FormElement label="Unit System">
        <RadioElement
          direction="horizontal"
          options={unitSystemOptions}
          value={formData.unitSystem}
          onChange={handleChange("unitSystem")}
        />
      </FormElement>

      <FormElement label="Height" error={errors.height}>
        <InputElement
          placeholder="Enter Height"
          value={formData.height}
          onChangeText={handleChange("height")}
          inputMode="decimal"
          keyboardType="decimal-pad"
        >
          <InputSlot className="px-3">
            <Text>{heightUnitSystem}</Text>
          </InputSlot>
        </InputElement>
      </FormElement>

      <FormElement label="Weight" error={errors.weight}>
        <InputElement
          placeholder="Enter Weight"
          value={formData.weight}
          onChangeText={handleChange("weight")}
          inputMode="decimal"
          keyboardType="decimal-pad"
        >
          <InputSlot className="px-3">
            <Text>{weightUnitSystem}</Text>
          </InputSlot>
        </InputElement>
      </FormElement>

      <FormElement label="Dietary Preference" error={errors.dietaryPreference}>
        <RadioElement
          options={dietaryPreferenceOptions}
          value={formData.dietaryPreference as string}
          onChange={handleChange("dietaryPreference")}
        />
      </FormElement>

      {bmi ? <BMIDisplay bmi={bmi} /> : null}
    </>
  );
};

import { useBodyMetricsStore } from "@/store/useOnboardingStore";
import {
  Gender,
  GenderOptions,
  UnitSystem,
  UnitSystemOptions,
  DietaryPreference,
  DietaryPreferenceOptions,
} from "@/constants/user.bodyMetric.type";
import { InputSlot, Text, VStack } from "@/components/ui";
import {
  FormElement,
  InputElement,
  RadioElement,
} from "@/components/ui/form-control/form";
import { BMIDisplay } from "./calc-bmi";

interface IBodyMetricsProps {
  formData: {
    age: string;
    gender: Gender;
    unitSystem: UnitSystem;
    height: string;
    weight: string;
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

export const BodyMetrics = ({
  formData,
  errors,
  handleChange,
}: IBodyMetricsProps) => {
  const { calculateBMI } = useBodyMetricsStore();

  const heightUnitSystem =
    formData.unitSystem == UnitSystemOptions.Imperial ? "ft" : "cm";
  const weightUnitSystem =
    formData.unitSystem == UnitSystemOptions.Imperial ? "lbs" : "kg";

  const bmi = calculateBMI(
    formData.height,
    formData.weight,
    formData.unitSystem
  );

  return (
    <>
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
            value={formData.age}
            onChangeText={handleChange("age")}
            inputMode="numeric"
            keyboardType="number-pad"
          />
        </FormElement>

        <FormElement label="Gender" error={errors.gender}>
          <RadioElement
            direction="horizontal"
            options={GenderOptions}
            value={formData.gender}
            onChange={handleChange("gender")}
          />
        </FormElement>

        <FormElement label="Unit System">
          <RadioElement
            direction="horizontal"
            options={UnitSystemOptions}
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

        <FormElement
          label="Dietary Preference"
          error={errors.dietaryPreference}
        >
          <RadioElement
            options={DietaryPreferenceOptions}
            value={formData.dietaryPreference}
            onChange={handleChange("dietaryPreference")}
          />
        </FormElement>

        {bmi ? <BMIDisplay bmi={bmi} /> : null}
      </VStack>
    </>
  );
};

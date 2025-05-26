import React from "react";
import { CircleIcon } from "lucide-react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  IFormControlProps,
} from "./index";
import { Input, InputField, IInputFieldProps } from "@/components/ui/input";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { IRadioGroupProps } from "@gluestack-ui/radio/lib/types";

type IFormProps = IFormControlProps &
  React.PropsWithChildren & {
    label?: string;
    error?: string;
  };

type IRadioElementProps = IRadioGroupProps & {
  options: string[];
  direction?: "vertical" | "horizontal";
};

export const FormElement = ({ label, error, children }: IFormProps) => {
  return (
    <FormControl
      isInvalid={!!error}
      size="sm"
      isDisabled={false}
      isReadOnly={false}
      isRequired={false}
      className="w-full gap-1"
    >
      {label ? (
        <FormControlLabel>
          <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>
      ) : null}

      {children}

      <FormControlError>
        <FormControlErrorText>{error}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export const InputElement = ({ children, ...props }: IInputFieldProps) => {
  return (
    <Input>
      <InputField className="text-sm" {...props} />
      {children}
    </Input>
  );
};

export const RadioElement = ({
  options,
  direction = "vertical",
  ...props
}: IRadioElementProps) => {
  return (
    <RadioGroup
      className={`gap-3 ${direction == "horizontal" ? "flex-row" : ""}`}
      {...props}
    >
      {options.map((option) => (
        <Radio
          key={option}
          value={option}
          size="sm"
          isInvalid={false}
          isDisabled={false}
        >
          <RadioIndicator>
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>

          <RadioLabel>{option}</RadioLabel>
        </Radio>
      ))}
    </RadioGroup>
  );
};

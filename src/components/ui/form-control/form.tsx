import React from "react";
import { ChevronDownIcon, CircleIcon, LucideIcon } from "lucide-react-native";
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
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { Card, Icon } from "@/components/ui";

type IFormProps = IFormControlProps &
  React.PropsWithChildren & {
    label?: string;
    error?: string;
  };

type IRadioElementProps = IRadioGroupProps & {
  options: Record<string, string>;
  direction?: "vertical" | "horizontal";
};

type IRadioElement2Props = IRadioGroupProps & {
  options: { label: string; icon: LucideIcon }[];
};

type ISelectElementProps = {
  options: {
    label: string;
    value: string;
    isDisabled?: boolean;
  }[];
};

export const FormElement = ({
  label,
  error,
  className,
  children,
}: IFormProps) => {
  return (
    <FormControl
      isInvalid={!!error}
      size="sm"
      isDisabled={false}
      isReadOnly={false}
      isRequired={false}
      className={`w-full gap-1 ${className}`}
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
      {Object.keys(options).map((key) => (
        <Radio
          key={key}
          value={options[key]}
          size="sm"
          isInvalid={false}
          isDisabled={false}
        >
          <RadioIndicator>
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>

          <RadioLabel>{key}</RadioLabel>
        </Radio>
      ))}
    </RadioGroup>
  );
};

export const RadioElement2 = ({ options, ...props }: IRadioElement2Props) => {
  return (
    <RadioGroup {...props}>
      {options.map(({ label, icon }) => (
        <Radio
          key={label}
          value={label}
          size="sm"
          isInvalid={false}
          isDisabled={false}
        >
          <Card
            variant="outline"
            className="flex-row items-center w-full gap-2"
          >
            <Icon as={icon} className="text-indigo-400" />
            <RadioLabel>{label}</RadioLabel>
          </Card>
        </Radio>
      ))}
    </RadioGroup>
  );
};

export const SelectElement = ({ options }: ISelectElementProps) => {
  return (
    <Select>
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder="Select option" className="flex-1" />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>

      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>

          {options.map((option) => (
            <SelectItem
              key={option.value}
              label={option.label}
              value={option.value}
              isDisabled={option.isDisabled}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

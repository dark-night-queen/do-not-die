import { CircleIcon } from "lucide-react-native";
import { IRadioGroupProps } from "@gluestack-ui/radio/lib/types";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";

type IRadioElementProps = IRadioGroupProps & {
  options: Record<string, string>;
  direction?: "vertical" | "horizontal";
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

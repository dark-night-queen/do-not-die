import { ChevronDownIcon } from "lucide-react-native";
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
import { ISelectProps } from "@gluestack-ui/select/lib/types";

type ISelectElementProps = {
  options: {
    label: string;
    value: string;
    isDisabled?: boolean;
  }[];
} & ISelectProps;

export const SelectElement = ({ options, ...props }: ISelectElementProps) => {
  return (
    <Select {...props}>
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

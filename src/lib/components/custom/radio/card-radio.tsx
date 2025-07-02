import React, { ReactNode } from "react";
import type { LucideIcon } from "lucide-react-native";
import { IRadioGroupProps } from "@gluestack-ui/radio/lib/types";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { Icon, UIRadio, RadioGroup, RadioLabel } from "@/components/ui";

type Option = {
  label: string;
  value: string;
  icon: LucideIcon;
} & Record<string, any>;

const cardRadioStyle = tva({
  base: "group/radio flex-row justify-start items-center w-full gap-2 web:cursor-pointer data-[disabled=true]:web:cursor-not-allowed",
  variants: {
    size: {
      sm: "p-3 rounded",
      md: "p-4 rounded-md",
      lg: "p-6 rounded-lg",
    },
    variant: {
      elevated: "bg-background-0 dark:bg-gray-800",
      outline:
        "border border-outline-200 bg-background-50 dark:bg-gray-800/80 data-[checked=true]:bg-indigo-700 data-[checked=true]:border-indigo-500",
      ghost: "rounded-none",
      filled: "bg-background-50",
    },
  },
});

type ICardRadioProps = Omit<React.ComponentProps<typeof UIRadio>, "context"> &
  VariantProps<typeof cardRadioStyle>;
const CardRadio = React.forwardRef<
  React.ComponentRef<typeof UIRadio>,
  ICardRadioProps
>(function Radio(
  { className, size = "md", variant = "elevated", ...props },
  ref,
) {
  return (
    <UIRadio
      className={cardRadioStyle({ class: className, size, variant })}
      {...props}
      ref={ref}
      context={{ size }}
    />
  );
});

type ICardRadioElementProps = {
  options: Option[];
  formatLabel?: (option: Option) => ReactNode;
  cardRadioProps?: VariantProps<typeof cardRadioStyle>;
} & IRadioGroupProps;

const CardRadioElement = ({
  options,
  formatLabel,
  cardRadioProps,
  ...props
}: ICardRadioElementProps) => {
  return (
    <RadioGroup {...props} className="gap-3">
      {options.map((opt) => {
        const { label, value, icon } = opt;
        return (
          <CardRadio
            key={value}
            value={value}
            size="md"
            variant="outline"
            isInvalid={false}
            isDisabled={false}
            {...cardRadioProps}
          >
            {formatLabel ? (
              formatLabel(opt)
            ) : (
              <>
                <Icon as={icon} className="text-indigo-400" />
                <RadioLabel>{label}</RadioLabel>
              </>
            )}
          </CardRadio>
        );
      })}
    </RadioGroup>
  );
};

CardRadio.displayName = "CardRadio";
CardRadioElement.displayName = "CardRadioElement";

export { CardRadio, CardRadioElement };

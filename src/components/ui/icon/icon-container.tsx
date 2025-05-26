import React from "react";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { LucideIcon } from "lucide-react-native";

type IIconContainerProps = {
  as: LucideIcon;
  className?: string;
  iconClassName?: string;
};

export const IconContainer = ({
  as,
  className,
  iconClassName,
}: IIconContainerProps) => {
  return (
    <Box
      className={`p-1.5 rounded-lg bg-background-0 ${className}`}
    >
      <Icon as={as} className={`text-indigo-400 ${iconClassName}`} />
    </Box>
  );
};

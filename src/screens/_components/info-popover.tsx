// core dependencies
import React, { useState } from "react";
import { Pressable } from "react-native";
import { Info } from "lucide-react-native";

// core components
import {
  Icon,
  Popover,
  PopoverBackdrop,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Text,
  VStack,
} from "@/components/ui";
import type { IIConProps } from "@/components/ui";

// constants
import { InfoText } from "@/constants/info/home";

type IInfoPopoverProps = InfoText & IIConProps;

// component logic
export const InfoPopover = ({
  header,
  description,
  footer,
  ...iconProps
}: IInfoPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      placement="bottom"
      size="xs"
      trigger={(triggerProps) => {
        return (
          <Pressable variant="link" {...triggerProps}>
            <Icon as={Info} {...iconProps} />
          </Pressable>
        );
      }}
    >
      <PopoverBackdrop />
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <VStack className="gap-2">
            <Text size="lg" className="font-bold">
              {header}
            </Text>
            {description}
            {footer ? <Text size="sm">{footer}</Text> : null}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

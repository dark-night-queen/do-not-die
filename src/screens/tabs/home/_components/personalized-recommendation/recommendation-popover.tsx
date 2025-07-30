// core dependencies
import React, { useState } from "react";
import { Info } from "lucide-react-native";

// core components
import {
  Button,
  ButtonIcon,
  Popover,
  PopoverBackdrop,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Text,
} from "@/components/ui";

export const RecommendationPopover = () => {
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
          <Button variant="link" {...triggerProps}>
            <ButtonIcon as={Info} />
          </Button>
        );
      }}
    >
      <PopoverBackdrop />
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text size="lg" className="font-bold">
            Recommendations
          </Text>
          <Text size="sm">
            These recommendations are based on your daily intake and nutritional
            goals. They&apos;re designed to help you make informed food choices
            and improve your overall nutrition.
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

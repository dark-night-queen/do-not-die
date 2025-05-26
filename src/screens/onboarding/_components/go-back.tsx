import React from "react";
import { Button, ButtonIcon } from "@/components/ui";
import { ChevronLeft } from "lucide-react-native";

type IGoBackProps = {
  goBack: () => void;
};

export const GoBack = ({ goBack }: IGoBackProps) => {
  return (
    <Button
      variant="link"
      className="self-start rounded-lg p-2 absolute top-5 left-3"
      onPress={goBack}
    >
      <ButtonIcon as={ChevronLeft} className="text-gray-400" />
    </Button>
  );
};

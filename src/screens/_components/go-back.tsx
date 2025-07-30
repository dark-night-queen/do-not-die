// core dependencies
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { Href, useNavigation, useRouter } from "expo-router";

// core components
import { Button, ButtonIcon, ButtonText } from "@/components/ui";

type IGoBackProps = {
  goBackRoute: Href;
  className?: string;
  type?: "text" | "icon";
};

export const GoBack = ({
  goBackRoute,
  className,
  type = "icon",
}: IGoBackProps) => {
  const navigation = useNavigation();
  const router = useRouter();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.replace(goBackRoute);
    }
  };

  return (
    <Button
      variant="link"
      className={`self-start rounded-lg p-2 absolute top-5 left-3 ${className}`}
      onPress={goBack}
    >
      {type === "icon" ? (
        <ButtonIcon as={ChevronLeft} className="text-gray-400" />
      ) : (
        <ButtonText>Cancel</ButtonText>
      )}
    </Button>
  );
};

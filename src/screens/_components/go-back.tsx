// core dependencies
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { Href, useNavigation, useRouter } from "expo-router";

// core components
import { Button, ButtonIcon } from "@/components/ui";

type IGoBackProps = {
  goBackRoute: Href;
};

export const GoBack = ({ goBackRoute }: IGoBackProps) => {
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
      className="self-start rounded-lg p-2 absolute top-5 left-3"
      onPress={goBack}
    >
      <ButtonIcon as={ChevronLeft} className="text-gray-400" />
    </Button>
  );
};

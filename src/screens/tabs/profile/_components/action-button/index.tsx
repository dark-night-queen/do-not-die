// core dependencies
import React, { useState } from "react";
import { LogOut } from "lucide-react-native";
import colors from "tailwindcss/colors";

// core components
import {
  Button,
  ButtonIcon,
  ButtonText,
  Spinner,
  VStack,
} from "@/components/ui";

// custom components
import { ResetOnboardingAlert } from "./reset-onboarding-alert";

interface IActionButtonType {
  logout: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
}

// component logic
export const ActionButtons = ({
  logout,
  resetOnboarding,
}: IActionButtonType) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const onLogout = async () => {
    setShowLoader(true);
    await logout();
    setShowLoader(false);
  };

  const onPressResetOnboarding = () => {
    setShowAlert(true);
  };

  const onPressClose = () => setShowAlert(false);
  const onPressSubmit = () => resetOnboarding();

  return (
    <VStack className="gap-4">
      <Button
        variant="outline"
        action="warning"
        onPress={onPressResetOnboarding}
      >
        <ButtonText>Reset Onboarding</ButtonText>
      </Button>

      <Button variant="link" onPress={onLogout}>
        <ButtonIcon as={LogOut} />
        <ButtonText>Sign Out</ButtonText>

        {showLoader ? <Spinner size="small" color={colors.white} /> : null}
      </Button>

      <ResetOnboardingAlert
        showAlert={showAlert}
        onClose={onPressClose}
        onSubmit={onPressSubmit}
      />
    </VStack>
  );
};

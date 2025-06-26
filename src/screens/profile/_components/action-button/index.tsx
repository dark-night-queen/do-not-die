import React from "react";
import { LogOut } from "lucide-react-native";
import colors from "tailwindcss/colors";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Spinner,
  VStack,
} from "@/components/ui";
import { ResetOnboardingAlert } from "./reset-onboarding-alert";

export const ActionButtons = () => {
  const { logout } = useAuthStore();
  const [showAlert, setShowAlert] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);

  const onLogout = async () => {
    setShowLoader(true);
    await logout();
    setShowLoader(false);
  };

  const onResetOnboarding = () => {
    setShowAlert(true);
  };
  const onCloseAlert = () => setShowAlert(false);

  return (
    <VStack className="gap-4">
      <Button variant="outline" action="warning" onPress={onResetOnboarding}>
        <ButtonText>Reset Onboarding</ButtonText>
      </Button>

      <Button variant="link" onPress={onLogout}>
        <ButtonIcon as={LogOut} />
        <ButtonText>Sign Out</ButtonText>

        {showLoader ? <Spinner size="small" color={colors.white} /> : null}
      </Button>

      <ResetOnboardingAlert showAlert={showAlert} onClose={onCloseAlert} />
    </VStack>
  );
};

import React from "react";
import colors from "tailwindcss/colors";
import { ChevronLeft } from "lucide-react-native";
import { useAuthStore } from "@/store/useAuthStore";
import { validateEmail as validateEmailUtil } from "@/utils/validate-auth";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Card,
  HStack,
  VStack,
  Text,
  Spinner,
} from "@/components/ui";
import { FormElement, InputElement } from "@/components/ui/form-control/form";
import { ForgetPasswordSuccess } from "./forget-password-success";

enum Screen {
  FORGET_PASSWORD = "forget-password",
  SUCCESS = "forget-password-success",
}

type IForgetPasswordProps = {
  handleSubmit: (email: string) => void;
  goBackToLogin: () => void;
};

export const ForgetPassword = ({
  handleSubmit,
  goBackToLogin,
}: IForgetPasswordProps) => {
  const { showLoader } = useAuthStore();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [currentScreen, setCurrentScreen] = React.useState(
    Screen.FORGET_PASSWORD
  );

  const handleChange = (value: string) => {
    setEmail(value);
    setError("");
  };

  const validateEmail = () => {
    const error_message = validateEmailUtil(email);
    setError(error_message);
    return !error_message;
  };

  const onSendEmail = () => {
    if (validateEmail()) {
      handleSubmit(email);
      setCurrentScreen(Screen.SUCCESS);
    }
  };

  return (
    <Card variant="outline" className="w-full max-w-sm p-4">
      <VStack className="gap-4">
        <HStack className="items-center gap-2">
          <Button variant="link" onPress={goBackToLogin}>
            <ButtonIcon as={ChevronLeft} />
          </Button>
          <Text className="text-xl font-semibold">Reset Password</Text>
        </HStack>

        {currentScreen == Screen.SUCCESS ? (
          <ForgetPasswordSuccess goBackToLogin={goBackToLogin} />
        ) : (
          <>
            <Text className="text-sm text-gray-400">
              Enter your email address and we'll send you a link to reset your
              password.
            </Text>

            <FormElement error={error}>
              <InputElement
                placeholder="Email"
                value={email}
                onChangeText={handleChange}
                keyboardType="email-address"
              />
            </FormElement>

            <Button onPress={onSendEmail}>
              <ButtonText>Send Email</ButtonText>
              {showLoader["forget-password"] ? (
                <Spinner size="small" color={colors.white} />
              ) : null}
            </Button>
          </>
        )}
      </VStack>
    </Card>
  );
};
